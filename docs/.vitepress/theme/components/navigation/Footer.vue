<template>
    <v-footer :style="{ background: 'var(--footer-bg)' }">
        <v-row justify="center" align="end" no-gutters>
            <v-btn
                v-for="link in links"
                :key="link.text"
                class="mx-0 bold-text theme-button"
                rounded="xl"
                variant="text"
                :href="link.link"
            >
                <v-sheet class="pa-0 ma-0" color="transparent">
                    <v-icon class="theme-icon" size="14" :icon="link.icon" />
                    {{ link.text }}
                </v-sheet>
            </v-btn>
            <v-col 
                v-if="footerConfig.statsEnabled && (siteViews > 0 || siteVisitors > 0)"
                class="text-center text-small bold-text theme-text"
                cols="12"
            >
                <v-sheet class="pa-0 ma-0" color="transparent">
                    <v-icon class="theme-icon mr-1" size="12" icon="mdi-eye-outline" />
                    <span>{{ t.totalViews }}: {{ siteViews.toLocaleString() }}</span>
                    <span class="mx-2">|</span>
                    <v-icon class="theme-icon mr-1" size="12" icon="mdi-account-outline" />
                    <span>{{ t.visitors }}: {{ siteVisitors.toLocaleString() }}</span>
                </v-sheet>
            </v-col>
            
            <v-col
                class="text-center text-large bold-text mt-2 theme-text"
                cols="12"
            >
                {{ t.copyright }}©{{ currentYear }}-{{ footerConfig.beginYear }}
                {{ t.authorName }}
            </v-col>
        </v-row>
        
        <!-- 不蒜子统计元素 - 使用绝对定位隐藏 -->
        <div style="position: absolute; left: -9999px;">
            <span id="busuanzi_container_site_pv">
                <span id="busuanzi_value_site_pv"></span>
            </span>
            <span id="busuanzi_container_site_uv">
                <span id="busuanzi_value_site_uv"></span>
            </span>
        </div>
    </v-footer>
</template>

<script setup lang="ts">
    // @i18n
    import { ref, onMounted, computed } from "vue";
    import { useData } from "vitepress";
    import { useI18n } from "@utils/i18n/locale/useI18n";

    const { t } = useI18n({
        authorName: "M1hono",
        copyright: "Copyright",
        icpNumber: "", // Set to true and provide number if needed in China
        license: "Licensed under CC BY-SA 4.0",
        privacyPolicy: "Privacy Policy",
        totalViews: "Total Views",
        visitors: "Visitors",
    });

    interface FooterLink {
        text: string;
        link: string;
        icon: string;
    }

    interface FooterConfig {
        beginYear: string;
        icpEnabled: boolean;
        icpLink: string;
        icpIcon: string;
        licenseLink: string;
        licenseIcon: string;
        licenseEnabled: boolean;
        customLinks: {
            textKey: keyof typeof t.value;
            link: string;
            icon: string;
            enabled: boolean;
        }[];
        statsEnabled: boolean;
    }

    const { lang } = useData();
    
    const siteViews = ref(0);
    const siteVisitors = ref(0);

    const currentYear = new Date().getFullYear();

    // This could be moved to a separate config file if it grows larger
    const footerConfig = computed<FooterConfig>(() => ({
            beginYear: "2024",
        icpEnabled: false,
        icpLink: "https://beian.miit.gov.cn/#/Integrated/index",
        icpIcon: "mdi-monitor",
        licenseLink: "https://creativecommons.org/licenses/by-sa/4.0/",
        licenseIcon: "mdi-wrench-outline",
        licenseEnabled: true,
            customLinks: [
                // {
            //     textKey: "privacyPolicy",
                //     link: "/privacy",
                //     icon: "mdi-shield-account-outline",
                //     enabled: true
                // }
            ],
        statsEnabled: true
    }));

    const links = computed(() => {
        const result: FooterLink[] = [];
        const config = footerConfig.value;
        const translations = t.value as any;
        
        if (config.icpEnabled && translations.icpNumber) {
            result.push({
                text: translations.icpNumber,
                link: config.icpLink,
                icon: config.icpIcon
            });
        }
        
        if (config.licenseEnabled) {
            result.push({
                text: translations.license,
                link: config.licenseLink,
                icon: config.licenseIcon
            });
        }
        
        if (config.customLinks) {
            result.push(...config.customLinks
                .filter(link => link.enabled)
                .map(link => ({
                    text: translations[link.textKey],
                    link: link.link,
                    icon: link.icon
                }))
            );
        }
        
        return result;
    });

    onMounted(() => {
        if (!footerConfig.value.statsEnabled) return;
        
        const updateSiteStats = () => {
            const pvElement = document.querySelector('#busuanzi_value_site_pv');
            const uvElement = document.querySelector('#busuanzi_value_site_uv');
            
            const pvText = pvElement?.innerHTML;
            const uvText = uvElement?.innerHTML;
            
            if (pvText && !isNaN(parseInt(pvText))) {
                siteViews.value = parseInt(pvText);
            }
            if (uvText && !isNaN(parseInt(uvText))) {
                siteVisitors.value = parseInt(uvText);
            }
        };

        const interval = setInterval(updateSiteStats, 2000);
        setTimeout(() => clearInterval(interval), 15000);
        
        setTimeout(updateSiteStats, 3000);
    });
</script>

<style scoped>
    .text-large {
        font-size: 14px;
    }
    .text-small {
        font-size: 12px;
        opacity: 0.8;
    }
    .bold-text {
        font-weight: 400;
    }
    .theme-button {
        color: var(--footer-text-color);
    }
    .theme-icon {
        color: var(--footer-text-color);
    }
    .theme-text {
        color: var(--footer-text-color);
    }
</style>
