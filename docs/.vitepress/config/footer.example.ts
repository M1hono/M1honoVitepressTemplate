/**
 * Footer Configuration Example
 * 
 * This file shows how to configure the Footer component in your VitePress theme config.
 * Add this configuration to your .vitepress/config.ts file under themeConfig.footer
 */

export const footerConfig = {
  footer: {
    // Author information
    author: {
      name: {
        "en-US": "Your Name",
        "zh-CN": "你的名字",
        "ja-JP": "あなたの名前",
        "ko-KR": "당신의 이름",
        "fr-FR": "Votre nom",
        "de-DE": "Ihr Name",
        "es-ES": "Su nombre",
        "pt-BR": "Seu nome",
        "ru-RU": "Ваше имя"
      },
      icon: "mdi-copyright" // Optional Vuetify icon
    },

    // Copyright text
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

    // Starting year for copyright
    beginYear: "2024",

    // ICP备案信息 (主要用于中国网站)
    icp: {
      enabled: true, // Set to false to disable ICP display
      number: "晋ICP备2022005790号-2",
      link: "https://beian.miit.gov.cn/#/Integrated/index",
      icon: "mdi-monitor"
    },

    // License information
    license: {
      enabled: true, // Set to false to disable license display
      code: {
        "en-US": "Licensed under CC BY-SA 4.0",
        "zh-CN": "基于 CC BY-SA 4.0 证书发布",
        "ja-JP": "CC BY-SA 4.0 ライセンスの下で",
        "ko-KR": "CC BY-SA 4.0 라이선스 하에",
        "fr-FR": "Sous licence CC BY-SA 4.0",
        "de-DE": "Lizenziert unter CC BY-SA 4.0",
        "es-ES": "Licenciado bajo CC BY-SA 4.0",
        "pt-BR": "Licenciado sob CC BY-SA 4.0",
        "ru-RU": "Лицензировано под CC BY-SA 4.0"
      },
      link: "https://creativecommons.org/licenses/by-sa/4.0/",
      icon: "mdi-wrench-outline"
    },

    // Custom footer links
    customLinks: [
      {
        enabled: true,
        code: {
          "en-US": "Privacy Policy",
          "zh-CN": "隐私政策",
          "ja-JP": "プライバシーポリシー",
          "ko-KR": "개인정보처리방침",
          "fr-FR": "Politique de confidentialité",
          "de-DE": "Datenschutzrichtlinie",
          "es-ES": "Política de privacidad",
          "pt-BR": "Política de privacidade",
          "ru-RU": "Политика конфиденциальности"
        },
        link: "/privacy",
        icon: "mdi-shield-lock-outline"
      },
      {
        enabled: true,
        code: {
          "en-US": "Terms of Service",
          "zh-CN": "服务条款",
          "ja-JP": "利用規約",
          "ko-KR": "서비스 약관",
          "fr-FR": "Conditions d'utilisation",
          "de-DE": "Nutzungsbedingungen",
          "es-ES": "Términos de servicio",
          "pt-BR": "Termos de serviço",
          "ru-RU": "Условия использования"
        },
        link: "/terms",
        icon: "mdi-file-document-outline"
      }
    ],

    // Site statistics (不蒜子统计)
    stats: {
      enabled: true, // Set to false to disable site statistics
      labels: {
        "en-US": { 
          views: "Total Views", 
          visitors: "Visitors" 
        },
        "zh-CN": { 
          views: "总访问量", 
          visitors: "访客数" 
        },
        "ja-JP": { 
          views: "総閲覧数", 
          visitors: "訪問者数" 
        },
        "ko-KR": { 
          views: "총 조회수", 
          visitors: "방문자 수" 
        },
        "fr-FR": { 
          views: "Vues totales", 
          visitors: "Visiteurs" 
        },
        "de-DE": { 
          views: "Gesamtaufrufe", 
          visitors: "Besucher" 
        },
        "es-ES": { 
          views: "Vistas totales", 
          visitors: "Visitantes" 
        },
        "pt-BR": { 
          views: "Visualizações totais", 
          visitors: "Visitantes" 
        },
        "ru-RU": { 
          views: "Всего просмотров", 
          visitors: "Посетители" 
        }
      }
    }
  }
};

// Usage in .vitepress/config.ts:
/*
import { footerConfig } from './config/footer.example';

export default {
  themeConfig: {
    ...footerConfig,
    // ... other theme config
  }
}
*/

// Minimal configuration example:
/*
export default {
  themeConfig: {
    footer: {
      author: {
        name: {
          "en-US": "Your Name",
          "zh-CN": "你的名字"
        }
      },
      icp: {
        enabled: false // Disable ICP for international sites
      }
    }
  }
}
*/ 