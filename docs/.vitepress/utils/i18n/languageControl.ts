export const traditionalChineseStyles = `
    :root,
    body,
    .VPDoc,
    .vp-doc,
    .content,
    .content-container,
    main,
    article {
        font-variant-east-asian: traditional !important;
    }

    .vp-doc h1,
    .vp-doc h2,
    .vp-doc h3,
    .vp-doc h4,
    .vp-doc h5,
    .vp-doc h6,
    .vp-doc p,
    .vp-doc li,
    .vp-doc a,
    .vp-doc span,
    .vp-doc div,
    .nav-bar-title,
    .VPNavBarTitle,
    .VPNavBar,
    .VPNavBarMenu,
    .VPNavScreen,
    .VPSidebar,
    .VPFooter,
    .VPTeamPage,
    .VPHomeHero,
    .VPFeatures {
        font-variant-east-asian: traditional !important;
    }

    * {
        font-variant-east-asian: traditional !important;
    }
`;

export const checkFontLoading = async () => {
    if (import.meta.env.SSR) return;
    
    try {
        const fontCheckPromise = Promise.race([
            document.fonts.ready,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Font loading timeout')), 5000)
            )
        ]);
        
        await fontCheckPromise;
        console.log('System fonts loaded successfully');
    } catch (error) {
        console.error('Font loading check error:', error);
    }
};

export const applyTraditionalChinese = () => {
    if (import.meta.env.SSR) return;
    
    const docElement = document.documentElement;
    const styleId = 'traditional-chinese-style';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = traditionalChineseStyles;
        document.head.appendChild(styleElement);
        
        document.body.style.setProperty('font-variant-east-asian', 'traditional', 'important');
    }
};

export const setupLanguageControl = () => {
    if (import.meta.env.SSR) return;
    
    const browserLang = navigator.language;
    if (browserLang === 'zh-TW' || browserLang === 'zh-HK') {
        applyTraditionalChinese();
        checkFontLoading();
    }
}; 