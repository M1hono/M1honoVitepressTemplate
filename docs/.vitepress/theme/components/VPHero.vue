<script setup lang="ts">
    import {
        type Ref,
        inject,
        onMounted,
        onUnmounted,
        ref,
        nextTick,
        computed,
    } from "vue";
    import type { DefaultTheme } from "vitepress/theme";
    import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
    import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
    import { motion } from "motion-v";
    import { useData } from "vitepress";
    
    import defaultSnippets from "../../config/defaultSnippets.json";
    import customSnippets from "../../config/snippets.json";

    export interface HeroAction {
        theme?: "brand" | "alt";
        text: string;
        link: string;
        target?: string;
        rel?: string;
    }

    export interface CodeSnippetCategory {
        name: string;
        snippets: string[];
        color?: string;
        darkColor?: string;
    }

    export interface SnippetControl {
        enabled: boolean;
    }

    export type SnippetConfig = CodeSnippetCategory | SnippetControl;

    const props = defineProps<{
        name?: string;
        text?: string;
        tagline?: string;
        image?: DefaultTheme.ThemeableImage;
        actions?: HeroAction[];
    }>();

    const heroImageSlotExists = inject(
        "hero-image-slot-exists"
    ) as Ref<boolean>;

    const { site, lang } = useData();

    const snippetIndices = ref<Record<string, number[]>>({});

    const initializeSnippetIndices = () => {
        const indices: Record<string, number[]> = {};
        snippetCategories.value.forEach((category) => {
            indices[category.name] = [0, 1];
        });
        snippetIndices.value = indices;
    };

    const getCodeSnippet = (category: CodeSnippetCategory, slot: number): string => {
        if (!category.snippets || category.snippets.length === 0) {
            return "";
        }
        
        const indices = snippetIndices.value[category.name];
        if (!indices || indices.length <= slot) {
            return category.snippets[slot % category.snippets.length];
        }
        
        const index = indices[slot];
        return category.snippets[index % category.snippets.length];
    };

    const snippetCategories = computed<CodeSnippetCategory[]>(() => {
        const merged: CodeSnippetCategory[] = [];
        
        const defaultConfig = defaultSnippets as SnippetConfig[];
        let defaultEnabled = true;
        
        if (defaultConfig.length > 0 && 'enabled' in defaultConfig[0]) {
            defaultEnabled = (defaultConfig[0] as SnippetControl).enabled;
        }
        
        if (defaultEnabled) {
            const snippetItems = defaultConfig.filter((item): item is CodeSnippetCategory => 
                'name' in item && 'snippets' in item
            );
            merged.push(...snippetItems);
        }
        
        const customConfig = customSnippets as SnippetConfig[];
        if (customConfig && customConfig.length > 0) {
            const customSnippetItems = customConfig.filter((item): item is CodeSnippetCategory => 
                'name' in item && 'snippets' in item
            );
            merged.push(...customSnippetItems);
        }
        
        return merged;
    });

    const shouldShowFloatingWords = computed(() => {
        return snippetCategories.value.length > 0;
    });

    const morphText = (element: HTMLElement, fromText: string, toText: string, duration: number = 1200) => {
        const steps = 60;
        const stepTime = duration / steps;
        let currentStep = 0;
        
        const maxLength = Math.max(fromText.length, toText.length);
        const charStartTimes = Array.from({ length: maxLength }, (_, i) => 
            0.2 + (i / maxLength) * 0.6
        );
        
        const interval = setInterval(() => {
            currentStep++;
            const globalProgress = currentStep / steps;
            
            if (globalProgress >= 1) {
                element.textContent = toText;
                clearInterval(interval);
                return;
            }
            
            let result = '';
            
            for (let i = 0; i < maxLength; i++) {
                const fromChar = fromText[i] || '';
                const toChar = toText[i] || '';
                const charStartTime = charStartTimes[i];
                const charProgress = Math.max(0, Math.min(1, (globalProgress - charStartTime) / 0.3));
                
                if (fromChar === toChar) {
                    result += fromChar;
                } else if (charProgress >= 1) {
                    result += toChar;
                } else if (charProgress > 0) {
                    if (charProgress < 0.7) {
                        const flickerChars = '!@#$%^&*()[]{}|;:,.<>?';
                        const randomChar = flickerChars[Math.floor(Math.random() * flickerChars.length)];
                        result += Math.random() < 0.5 ? randomChar : fromChar;
                    } else {
                        result += Math.random() < 0.8 ? toChar : fromChar;
                    }
                } else {
                    result += fromChar;
                }
            }
            
            element.textContent = result;
        }, stepTime);
    };

    const rotateSnippets = () => {
        const newIndices: Record<string, number[]> = {};
        
        snippetCategories.value.forEach((category) => {
            const currentIndices = snippetIndices.value[category.name] || [0, 1];
            const snippetCount = category.snippets.length;
            
            if (snippetCount > 2) {
                newIndices[category.name] = [
                    (currentIndices[0] + 2) % snippetCount,
                    (currentIndices[1] + 2) % snippetCount
                ];
            } else {
                newIndices[category.name] = [
                    (currentIndices[0] + 1) % Math.max(snippetCount, 1),
                    (currentIndices[1] + 1) % Math.max(snippetCount, 1)
                ];
            }
        });

        const floatingWords = document.querySelectorAll('.floating-word');
        floatingWords.forEach((wordElement, index) => {
            const element = wordElement as HTMLElement;
            const currentText = element.textContent || '';
            
            setTimeout(() => {
                const categoryIndex = Math.floor(index / 2);
                const slotIndex = index % 2;
                const category = snippetCategories.value[categoryIndex];
                
                if (category) {
                    const oldIndices = snippetIndices.value[category.name] || [0, 1];
                    const newIndices_cat = newIndices[category.name];
                    const newIndex = newIndices_cat[slotIndex];
                    const newText = category.snippets[newIndex % category.snippets.length];
                    
                    if (currentText !== newText) {
                        morphText(element, currentText, newText, 1000);
                    }
                }
            }, index * 100);
        });
        
        setTimeout(() => {
            snippetIndices.value = newIndices;
        }, 1000);
    };

    const heroContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
            },
        },
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scaleY: 0,
            transformOrigin: "bottom",
        },
        visible: (i: unknown) => ({
            opacity: 1,
            y: 0,
            scaleY: 1,
            transformOrigin: "bottom",
            transition: {
                type: "spring",
                damping: 18,
                stiffness: 120,
                delay: (i as number) * 0.03,
                duration: 0.8,
            },
        }),
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scaleX: 0.3,
            transformOrigin: "left",
        },
        visible: (i: unknown) => ({
            opacity: 1,
            y: 0,
            scaleX: 1,
            transformOrigin: "left",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: (i as number) * 0.08,
                duration: 1.0,
            },
        }),
    };

    const subtitleVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            clipPath: "inset(0 100% 0 0)",
        },
        visible: {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0)",
            transition: {
                duration: 1.0,
                ease: "easeOut",
                delay: 0.6,
            },
        },
    };

    const taglineVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            clipPath: "inset(0 100% 0 0)",
        },
        visible: {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0)",
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.8,
            },
        },
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20,
        },
        visible: (i: unknown) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                duration: 0.5,
                delay: (i as number) * 0.1 + 1.2,
            },
        }),
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
            },
        },
    };

    const imageHover = {
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.3,
        },
    };

    const parallaxContainer = ref<HTMLElement | null>(null);
    const floatingWords = ref<HTMLElement[]>([]);
    const isMobile = ref(false);
    
    const rotationTimer = ref<NodeJS.Timeout | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        if (!parallaxContainer.value || window.innerWidth < 768) return;

        const { clientX, clientY } = event;
        const { offsetWidth, offsetHeight } = parallaxContainer.value;
        const xPercent = (clientX / offsetWidth - 0.5) * 2;
        const yPercent = (clientY / offsetHeight - 0.5) * 2;

        floatingWords.value.forEach((word, index) => {
            const intensity = parseFloat(word.dataset.intensity || "3");
            const strength = ((index % 6) + 1) * intensity;
            const x = xPercent * strength * 0.5;
            const y = yPercent * strength * 0.5;

            word.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    };

    const checkMobile = () => {
        isMobile.value = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const isExternalLink = (link: string) => {
        return /^https?:\/\//.test(link);
    };

    onMounted(() => {
        nextTick(() => {
            initializeSnippetIndices();
            
            if (shouldShowFloatingWords.value) {
                rotationTimer.value = setInterval(() => {
                    rotateSnippets();
                }, 4000);
            }

            parallaxContainer.value = document.querySelector(".hero-bg");
            floatingWords.value = Array.from(
                document.querySelectorAll(".floating-word")
            );

            if (typeof window !== "undefined") {
                checkMobile();
                window.addEventListener("mousemove", handleMouseMove, {
                    passive: true,
                });
                window.addEventListener("resize", checkMobile, {
                    passive: true,
                });
            }
        });
    });

    onUnmounted(() => {
        if (rotationTimer.value) {
            clearInterval(rotationTimer.value);
            rotationTimer.value = null;
        }

        if (typeof window !== "undefined") {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkMobile);
        }
    });
</script>

<template>
    <div
        class="VPHero hero-enhanced"
        :class="{ 'has-image': image || heroImageSlotExists }"
    >
        <div class="hero-bg" ref="parallaxContainer">
            <div class="bg-gradient"></div>

            <div v-if="shouldShowFloatingWords" class="floating-words">
                <div
                    v-for="(category, catIndex) in snippetCategories"
                    :key="category.name"
                    class="word-group"
                    :class="category.name"
                >
                    <span
                        v-for="slot in 2"
                        :key="`${category.name}-${slot}`"
                        class="floating-word"
                        :data-intensity="3 + (slot % 2)"
                        :style="{
                            animationDelay: `${catIndex * 3 + slot * 1.5}s`,
                            '--float-duration': `${20 + slot * 6}s`,
                            '--hue-offset': `${catIndex * 72}deg`,
                            '--custom-color': category.color,
                            '--custom-dark-color': category.darkColor,
                        }"
                    >
                        {{ getCodeSnippet(category, slot - 1) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="container">
            <motion.div
                class="main"
                :variants="heroContainerVariants"
                initial="hidden"
                :whileInView="'visible'"
                :viewport="{ once: false, margin: '-50px' }"
            >
                <slot name="home-hero-info-before" />
                <slot name="home-hero-info">
                    <div class="heading">
                        <h1 v-if="props.name" class="name">
                            <motion.span
                                v-for="(word, wordIndex) in props.name.split(' ')"
                                :key="`word-${wordIndex}`"
                                class="word-wrapper"
                                :variants="wordVariants"
                                :custom="wordIndex"
                                initial="hidden"
                                :whileInView="'visible'"
                                :viewport="{ once: false, margin: '-100px' }"
                            >
                                <motion.span
                                    v-for="(letter, letterIndex) in word.split(
                                        ''
                                    )"
                                    :key="`letter-${wordIndex}-${letterIndex}`"
                                    class="letter"
                                    :variants="letterVariants"
                                    :custom="wordIndex * 5 + letterIndex"
                                    initial="hidden"
                                    :whileInView="'visible'"
                                        :viewport="{ once: false, margin: '-100px' }"
                                >
                                    {{ letter }}
                                </motion.span>
                                <span class="word-space">&nbsp;</span>
                            </motion.span>
                        </h1>

                        <motion.h2
                            v-if="props.text"
                            class="text"
                            :variants="subtitleVariants"
                            initial="hidden"
                            :whileInView="'visible'"
                            :viewport="{ once: false, margin: '-100px' }"
                        >
                            {{ props.text }}
                        </motion.h2>
                    </div>

                    <motion.p
                        v-if="props.tagline"
                        class="tagline"
                        :variants="taglineVariants"
                        initial="hidden"
                        :whileInView="'visible'"
                        :viewport="{ once: false, margin: '-100px' }"
                    >
                        {{ props.tagline }}
                    </motion.p>
                </slot>
                <slot name="home-hero-info-after" />

                <div
                    v-if="actions && actions.length > 0"
                    class="actions"
                >
                    <motion.div
                        v-for="(action, index) in actions"
                        :key="`btn-${index}`"
                        class="action"
                        :variants="buttonVariants"
                        initial="hidden"
                        :whileInView="'visible'"
                        :viewport="{ once: true }"
                        :custom="index"
                    >
                        <VPButton
                            :theme="action.theme || 'brand'"
                            :text="action.text"
                            :href="action.link"
                            :target="action.target || (isExternalLink(action.link) ? '_blank' : undefined)"
                            :rel="action.rel || (isExternalLink(action.link) ? 'noopener noreferrer' : undefined)"
                            size="medium"
                        />
                    </motion.div>
                </div>
                <slot name="home-hero-actions-after" />
            </motion.div>

            <div
                v-if="(image || heroImageSlotExists) && isMobile"
                class="image image-mobile"
            >
                <div class="image-container">
                    <slot name="home-hero-image">
                        <VPImage v-if="image" class="image-src" :image />
                    </slot>
                </div>
            </div>
            <motion.div
                v-else-if="image || heroImageSlotExists"
                class="image"
                :variants="imageVariants"
                :whileHover="imageHover"
                initial="hidden"
                :whileInView="'visible'"
                :viewport="{ once: false, margin: '-50px' }"
            >
                <div class="image-container">
                    <slot name="home-hero-image">
                        <VPImage v-if="image" class="image-src" :image />
                    </slot>
                </div>
            </motion.div>
        </div>

        <div class="hero-wave">
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                class="wave-svg"
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25"
                    class="shape-fill"
                ></path>
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5"
                    class="shape-fill"
                ></path>
                <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    class="shape-fill"
                ></path>
            </svg>
        </div>
    </div>
</template>

<style scoped>
    .VPHero.hero-enhanced {
        position: relative;
        margin-top: calc(
            (var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1
        );
        padding: calc(
                var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
            )
            24px 120px;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: var(--vp-c-bg);
    }

    .container {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        max-width: 1400px;
        width: 100%;
    }

    @media (min-width: 960px) {
        .container {
            flex-direction: row;
            align-items: center;
        }
    }

    .main {
        position: relative;
        z-index: 10;
        order: 2;
        flex-grow: 1;
        flex-shrink: 0;
    }

    .VPHero.has-image .container {
        text-align: center;
    }

    @media (min-width: 960px) {
        .VPHero.has-image .container {
            text-align: left;
        }

        .main {
            order: 1;
            width: calc((100% / 5) * 3);
            padding-right: 64px;
        }

        .VPHero.has-image .main {
            max-width: none;
        }
    }

    .heading {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
    }

    .name {
        margin: 0 0 24px 0;
        font-size: clamp(40px, 8vw, 80px);
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.02em;
        font-family: "Inter", "SF Pro Display", -apple-system,
            BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        position: relative;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        color: var(--vp-c-brand-1);
    }

    .name::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            var(--vp-c-brand-1) 0%,
            var(--vp-c-brand-2) 30%,
            var(--vp-c-brand-3) 60%,
            var(--vp-c-brand-1) 100%
        );
        background-size: 300% 300%;
        animation: gradient-flow 6s ease-in-out infinite;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        pointer-events: none;
    }

    .name .letter {
        position: relative;
        display: inline-block;
        color: inherit;
    }
    @supports not (-webkit-background-clip: text) {
        .name::before {
            display: none;
        }
        .name {
            background: linear-gradient(
                135deg,
                var(--vp-c-brand-1) 0%,
                var(--vp-c-brand-2) 30%,
                var(--vp-c-brand-3) 60%,
                var(--vp-c-brand-1) 100%
            );
            background-size: 300% 300%;
            animation: gradient-flow 6s ease-in-out infinite;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    @keyframes gradient-flow {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    .word-wrapper {
        display: inline-block;
    }

    .letter {
        display: inline-block;
        transform-origin: bottom;
    }

    .word-space {
        display: inline-block;
        width: 0.3em;
    }

    .text {
        margin: 0 0 16px 0;
        font-size: clamp(24px, 4vw, 42px);
        font-weight: 700;
        line-height: 1.2;
        font-family: "Inter", "SF Pro Display", -apple-system,
            BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        color: var(--vp-c-text-1);
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        position: relative;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
    }

    .tagline {
        margin: 0 0 48px 0;
        font-size: clamp(18px, 2.5vw, 28px);
        font-weight: 500;
        line-height: 1.6;
        color: var(--vp-c-text-2);
        max-width: 600px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        position: relative;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
    }

    

    .VPHero.has-image .tagline {
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 960px) {
        .VPHero.has-image .tagline {
            margin-left: 0;
            margin-right: 0;
        }
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 8px;
        position: relative;
        z-index: 10;
    }

    .VPHero.has-image .actions {
        justify-content: center;
    }

    @media (min-width: 960px) {
        .VPHero.has-image .actions {
            justify-content: flex-start;
        }
    }

    .action {
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }





    .image {
        order: 1;
        margin: -40px -24px 40px;
        position: relative;
    }

    .image-mobile {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
        animation: mobile-fade-in 0.6s ease-out;
    }

    @keyframes mobile-fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (min-width: 960px) {
        .image {
            flex-grow: 1;
            order: 2;
            margin: 0;
            min-height: 100%;
            width: calc((100% / 5) * 2);
        }
    }

    .image-container {
        position: relative;
        margin: 0 auto;
        width: 360px;
        height: 360px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 640px) {
        .image-container {
            width: 480px;
            height: 480px;
        }
    }

    @media (min-width: 960px) {
        .image-container {
            width: 100%;
            height: 100%;
            max-width: 600px;
            max-height: 600px;
        }
    }

    .image-src {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 16px;
        transition: all 0.3s ease;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
    }

    .image-mobile .image-src {
        transform: none !important;
        -webkit-transform: none !important;
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 1;
    }

    .bg-gradient {
        position: absolute;
        inset: 0;
        background: radial-gradient(
                circle at 30% 20%,
                rgba(var(--vp-c-brand-rgb), 0.25) 0%,
                transparent 60%
            ),
            radial-gradient(
                circle at 70% 80%,
                rgba(var(--vp-c-brand-2-rgb), 0.2) 0%,
                transparent 60%
            ),
            radial-gradient(
                circle at 50% 50%,
                rgba(var(--vp-c-brand-3-rgb), 0.15) 0%,
                transparent 70%
            ),
            linear-gradient(
                135deg,
                rgba(var(--vp-c-brand-rgb), 0.1) 0%,
                rgba(var(--vp-c-brand-2-rgb), 0.08) 50%,
                transparent 100%
            );
        animation: bg-shift 15s ease-in-out infinite;
    }

    /* Sunshine light ray effects */
    .bg-gradient::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
                45deg,
                transparent 25%,
                rgba(255, 255, 255, 0.15) 50%,
                transparent 75%
            ),
            linear-gradient(
                -45deg,
                transparent 25%,
                rgba(255, 255, 255, 0.12) 50%,
                transparent 75%
            ),
            linear-gradient(
                135deg,
                transparent 35%,
                rgba(var(--vp-c-brand-rgb), 0.1) 50%,
                transparent 65%
            );
        animation: sunshine-rays 20s ease-in-out infinite;
        pointer-events: none;
    }

    .dark .bg-gradient::before {
        background: linear-gradient(
                45deg,
                transparent 25%,
                rgba(255, 255, 255, 0.08) 50%,
                transparent 75%
            ),
            linear-gradient(
                -45deg,
                transparent 25%,
                rgba(255, 255, 255, 0.06) 50%,
                transparent 75%
            ),
            linear-gradient(
                135deg,
                transparent 35%,
                rgba(var(--vp-c-brand-rgb), 0.12) 50%,
                transparent 65%
            );
    }

    @keyframes bg-shift {
        0%,
        100% {
            background-position: 0% 0%, 100% 100%, 0% 50%;
            opacity: 1;
        }
        50% {
            background-position: 100% 100%, 0% 0%, 100% 50%;
            opacity: 0.8;
        }
    }

    @keyframes sunshine-rays {
        0%,
        100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.6;
        }
        25% {
            transform: rotate(2deg) scale(1.02);
            opacity: 0.8;
        }
        50% {
            transform: rotate(-1deg) scale(1.01);
            opacity: 1;
        }
        75% {
            transform: rotate(1deg) scale(1.02);
            opacity: 0.7;
        }
    }



    .floating-words {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .word-group {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .floating-word {
        position: absolute;
        font-family: "Consolas", "Monaco", "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace;
        font-weight: 500;
        font-size: 14px;
        opacity: 0;
        color: var(--custom-color, var(--vp-c-text-3));
        pointer-events: none;
        user-select: none;
        white-space: nowrap;
        transform-origin: center;
        animation: float-curve var(--float-duration, 20s) ease-in-out infinite;
        animation-fill-mode: both;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        backdrop-filter: blur(1px);
    }

    .dark .floating-word {
        opacity: 0;
        color: var(--custom-dark-color, var(--custom-color, var(--vp-c-text-2)));
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    }

    .word-group:nth-child(odd) .floating-word:nth-child(odd) {
        animation-name: float-curve;
    }
    .word-group:nth-child(odd) .floating-word:nth-child(even) {
        animation-name: float-curve-bottom;
    }

    .word-group:nth-child(even) .floating-word:nth-child(odd) {
        animation-name: float-curve-bottom;
    }
    .word-group:nth-child(even) .floating-word:nth-child(even) {
        animation-name: float-curve;
    }

    @keyframes float-curve {
        0% {
            transform: translateX(-150px) translateY(20px) rotate(-5deg)
                scale(0.7);
            opacity: 0;
        }
        8% {
            opacity: 0.4;
        }
        20% {
            transform: translateX(-80px) translateY(-25px) rotate(3deg)
                scale(0.85);
            opacity: 0.7;
        }
        40% {
            transform: translateX(-20px) translateY(-45px) rotate(0deg) scale(1);
            opacity: 0.9;
        }
        60% {
            transform: translateX(40px) translateY(-35px) rotate(-2deg) scale(1);
            opacity: 1;
        }
        80% {
            transform: translateX(100px) translateY(-15px) rotate(2deg)
                scale(0.9);
            opacity: 0.6;
        }
        92% {
            opacity: 0.3;
        }
        100% {
            transform: translateX(150px) translateY(10px) rotate(5deg)
                scale(0.8);
            opacity: 0;
        }
    }

    @keyframes float-curve-bottom {
        0% {
            transform: translateX(-150px) translateY(-20px) rotate(5deg)
                scale(0.7);
            opacity: 0;
        }
        8% {
            opacity: 0.4;
        }
        20% {
            transform: translateX(-80px) translateY(25px) rotate(-3deg)
                scale(0.85);
            opacity: 0.7;
        }
        40% {
            transform: translateX(-20px) translateY(45px) rotate(0deg) scale(1);
            opacity: 0.9;
        }
        60% {
            transform: translateX(40px) translateY(35px) rotate(2deg) scale(1);
            opacity: 1;
        }
        80% {
            transform: translateX(100px) translateY(15px) rotate(-2deg)
                scale(0.9);
            opacity: 0.6;
        }
        92% {
            opacity: 0.3;
        }
        100% {
            transform: translateX(150px) translateY(-10px) rotate(-5deg)
                scale(0.8);
            opacity: 0;
        }
    }

    .word-group:nth-child(1) .floating-word:nth-child(1) {
        top: 20%;
        left: 15%;
    }
    .word-group:nth-child(1) .floating-word:nth-child(2) {
        top: 75%;
        left: 80%;
    }

    .word-group:nth-child(2) .floating-word:nth-child(1) {
        top: 30%;
        left: 70%;
    }
    .word-group:nth-child(2) .floating-word:nth-child(2) {
        top: 85%;
        left: 25%;
    }

    .word-group:nth-child(3) .floating-word:nth-child(1) {
        top: 45%;
        left: 85%;
    }
    .word-group:nth-child(3) .floating-word:nth-child(2) {
        top: 65%;
        left: 10%;
    }

    .word-group:nth-child(4) .floating-word:nth-child(1) {
        top: 15%;
        left: 45%;
    }
    .word-group:nth-child(4) .floating-word:nth-child(2) {
        top: 55%;
        left: 50%;
    }

    .word-group:nth-child(5) .floating-word:nth-child(1) {
        top: 35%;
        left: 20%;
    }
    .word-group:nth-child(5) .floating-word:nth-child(2) {
        top: 90%;
        left: 60%;
    }

    .hero-wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;
        transform: rotate(180deg);
        z-index: 5;
    }

    .wave-svg {
        position: relative;
        display: block;
        width: calc(100% + 1.3px);
        height: 80px;
    }

    .shape-fill {
        fill: var(--vp-c-bg);
        filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
    }

    .dark .shape-fill {
        fill: #1B1B1F;
        filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.3));
    }

    .dark .name {
        filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
        color: var(--vp-c-brand-1);
    }

    .dark .name::before {
        background: linear-gradient(
            135deg,
            var(--vp-c-brand-1) 0%,
            var(--vp-c-brand-2) 30%,
            var(--vp-c-brand-3) 60%,
            var(--vp-c-brand-1) 100%
        );
        background-size: 300% 300%;
        animation: gradient-flow 6s ease-in-out infinite;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
    }

    .dark .text {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
    }

    .dark .tagline {
        text-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15));
    }

    @media (max-width: 768px) {
        .VPHero.hero-enhanced {
            min-height: 90vh;
            padding: calc(
                    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
                        40px
                )
                16px 80px;
        }

        .floating-word {
            font-size: 11px !important;
        }

        .main {
            text-align: center;
        }

        .name {
            font-size: clamp(32px, 10vw, 60px) !important;
        }

        .text {
            font-size: clamp(20px, 6vw, 32px) !important;
        }

        .tagline {
            font-size: clamp(16px, 4vw, 22px) !important;
            margin-bottom: 32px !important;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            max-width: 320px;
            margin: 0 auto;
            justify-content: center;
        }

        .action {
            flex: 0 0 auto;
            min-width: 120px;
        }


    }

    @media (max-width: 480px) {
        .name {
            font-size: clamp(28px, 12vw, 48px) !important;
            margin-bottom: 16px !important;
        }

        .text {
            font-size: clamp(18px, 8vw, 28px) !important;
            margin-bottom: 12px !important;
        }

        .tagline {
            font-size: clamp(14px, 5vw, 20px) !important;
            margin-bottom: 24px !important;
        }

        .actions {
            gap: 10px !important;
            max-width: 280px !important;
        }


    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }

        .floating-word {
            animation: none !important;
        }
    }
</style>
