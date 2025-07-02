<template>
    <v-footer :style="{ background: 'var(--footer-bg)' }">
        <v-row justify="center" align="end" no-gutters>
            <v-btn
                v-for="link in links"
                :key="link.code[lang]"
                class="mx-0 bold-text theme-button"
                rounded="xl"
                variant="text"
                :href="link.link"
            >
                <v-sheet class="pa-0 ma-0" color="transparent">
                    <v-icon class="theme-icon" size="14" :icon="link.icon" />
                    {{ link.code[lang] }}
                </v-sheet>
            </v-btn>
            <v-col 
                v-if="footerConfig.stats?.enabled && (siteViews > 0 || siteVisitors > 0)"
                class="text-center text-small bold-text theme-text"
                cols="12"
            >
                <v-sheet class="pa-0 ma-0" color="transparent">
                    <v-icon class="theme-icon mr-1" size="12" icon="mdi-eye-outline" />
                    <span>{{ currentLangLabels.views }}: {{ siteViews.toLocaleString() }}</span>
                    <span class="mx-2">|</span>
                    <v-icon class="theme-icon mr-1" size="12" icon="mdi-account-outline" />
                    <span>{{ currentLangLabels.visitors }}: {{ siteVisitors.toLocaleString() }}</span>
                </v-sheet>
            </v-col>
            
            <v-col
                class="text-center text-large bold-text mt-2 theme-text"
                cols="12"
            >
                {{ footerConfig.copyright?.[lang] }}©{{ currentYear }}-{{ footerConfig.beginYear }}
                {{ footerConfig.author?.name?.[lang] }}
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
    import { ref, onMounted, computed } from "vue";
    import { useData } from "vitepress";

    /**
     * Footer configuration interface
     */
    interface FooterLink {
        code: Record<string, string>;
        link: string;
        icon: string;
        enabled?: boolean;
    }

    interface FooterConfig {
        author?: {
            name: Record<string, string>;
            icon?: string;
        };
        copyright?: Record<string, string>;
        beginYear?: string;
        icp?: {
            number: string;
            link?: string;
            icon?: string;
            enabled?: boolean;
        };
        license?: FooterLink;
        customLinks?: FooterLink[];
        stats?: {
            enabled?: boolean;
            labels?: Record<string, { views: string; visitors: string }>;
        };
    }

    const { lang, site } = useData();
    
    const siteViews = ref(0);
    const siteVisitors = ref(0);

    const currentYear = new Date().getFullYear();

    const footerConfig = computed<FooterConfig>(() => {
        return {
            author: {
                name: {
                    "en-US": "M1hono",
                    "zh-CN": "不是客服",
                    "ja-JP": "M1hono",
                    "ko-KR": "M1hono",
                    "fr-FR": "M1hono",
                    "de-DE": "M1hono",
                    "es-ES": "M1hono",
                    "pt-BR": "M1hono",
                    "ru-RU": "M1hono"
                },
                icon: "mdi-copyright"
            },
            copyright: {
                "en-US": "Copyright",
                "zh-CN": "版权所有",
                "ja-JP": "著作権",
                "ko-KR": "저작권",
                "fr-FR": "Droits d'auteur",
                "de-DE": "Urheberrecht",
                "es-ES": "Derechos de autor",
                "pt-BR": "Direitos autorais",
                "ru-RU": "Авторские права"
            },
            beginYear: "2024",
            icp: {
                enabled: false, // Set to true and provide number if needed in China
                number: "", // e.g., "京ICP备12345678号"
                link: "https://beian.miit.gov.cn/#/Integrated/index",
                icon: "mdi-monitor"
            },
            license: {
                code: {
                    "en-US": "Licensed under CC BY-SA 4.0",
                    "zh-CN": "基于 CC BY-SA 4.0 证书发布",
                    "ja-JP": "CC BY-SA 4.0 ライセンス",
                    "ko-KR": "CC BY-SA 4.0 라이선스",
                    "fr-FR": "Sous licence CC BY-SA 4.0",
                    "de-DE": "Lizenziert unter CC BY-SA 4.0",
                    "es-ES": "Licenciado bajo CC BY-SA 4.0",
                    "pt-BR": "Licenciado sob CC BY-SA 4.0",
                    "ru-RU": "Лицензия CC BY-SA 4.0"
                },
                link: "https://creativecommons.org/licenses/by-sa/4.0/",
                icon: "mdi-wrench-outline",
                enabled: true
            },
            customLinks: [
                // Add your custom footer links here
                // {
                //     code: {
                //         "en-US": "Privacy Policy",
                //         "zh-CN": "隐私政策"
                //     },
                //     link: "/privacy",
                //     icon: "mdi-shield-account-outline",
                //     enabled: true
                // }
            ],
            stats: {
                enabled: true,
                labels: {
                    "en-US": { views: "Total Views", visitors: "Visitors" },
                    "zh-CN": { views: "总访问量", visitors: "访客数" },
                    "ja-JP": { views: "総アクセス数", visitors: "訪問者数" },
                    "ko-KR": { views: "총 조회수", visitors: "방문자 수" },
                    "fr-FR": { views: "Vues totales", visitors: "Visiteurs" },
                    "de-DE": { views: "Gesamtansichten", visitors: "Besucher" },
                    "es-ES": { views: "Vistas totales", visitors: "Visitantes" },
                    "pt-BR": { views: "Visualizações totais", visitors: "Visitantes" },
                    "ru-RU": { views: "Всего просмотров", visitors: "Посетители" }
                }
            }
        };
    });

    const links = computed(() => {
        const result: FooterLink[] = [];
        
        if (footerConfig.value.icp?.enabled && footerConfig.value.icp.number) {
            result.push({
                code: Object.keys(footerConfig.value.copyright || {}).reduce((acc, langKey) => {
                    acc[langKey] = footerConfig.value.icp!.number;
                    return acc;
                }, {} as Record<string, string>),
                link: footerConfig.value.icp.link!,
                icon: footerConfig.value.icp.icon!
            });
        }
        
        if (footerConfig.value.license?.enabled) {
            result.push(footerConfig.value.license);
        }
        
        if (footerConfig.value.customLinks) {
            result.push(...footerConfig.value.customLinks.filter(link => link.enabled !== false));
        }
        
        return result;
    });

    const currentLangLabels = computed(() => {
        const currentLang = lang.value;
        const labels = footerConfig.value.stats?.labels?.[currentLang];
        
        if (!labels && footerConfig.value.stats?.labels) {
            const fallbackLang = Object.keys(footerConfig.value.stats.labels)[0];
            return footerConfig.value.stats.labels[fallbackLang] || { views: "Views", visitors: "Visitors" };
        }
        
        return labels || { views: "Views", visitors: "Visitors" };
    });

    onMounted(() => {
        if (!footerConfig.value.stats?.enabled) return;
        
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
