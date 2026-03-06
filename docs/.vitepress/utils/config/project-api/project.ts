import { projectConfig } from "../../../config/project-config";
import type {
    CopyLinkConfig,
    DrawioConfig,
    FooterOptionsConfig,
    GiscusConfig,
    MdVarConfig,
    PathConfig,
    ProjectConfig,
    SearchConfig,
    SocialButton,
    SpecialBackPath,
} from "../project-types";
import { getProjectSearchConfig } from "./search";

interface ProjectInfo {
    name: string;
    base: string;
    version: string;
    author: string;
    license: string;
    favicon: string;
    logo: ProjectConfig["logo"];
    repository: ProjectConfig["repository"];
    homepage: string;
    headerSocialLinks: ProjectConfig["headerSocialLinks"];
    editLink: ProjectConfig["editLink"];
    footerOptions: FooterOptionsConfig;
    drawio: DrawioConfig;
    mdVar: MdVarConfig;
    algolia: {
        appId: string;
        apiKey: string;
        indexName: string;
    };
    search: SearchConfig;
}

export function getDefaultCurrency(): string {
    return projectConfig.defaultCurrency;
}

export function getPaths(): PathConfig {
    return projectConfig.paths;
}

export function isFeatureEnabled(
    feature: keyof typeof projectConfig.features,
): boolean {
    return projectConfig.features[feature];
}

export function getProjectInfo(): ProjectInfo {
    const resolvedSearch = getProjectSearchConfig();

    return {
        name: projectConfig.name,
        base: projectConfig.base,
        version: projectConfig.version,
        author: projectConfig.author,
        license: projectConfig.license,
        favicon: projectConfig.favicon,
        logo: projectConfig.logo,
        repository: projectConfig.repository,
        homepage: projectConfig.homepage,
        headerSocialLinks: projectConfig.headerSocialLinks,
        editLink: projectConfig.editLink,
        footerOptions: projectConfig.footerOptions,
        drawio: projectConfig.drawio,
        mdVar: projectConfig.mdVar,
        algolia: {
            appId: resolvedSearch.algolia?.appId || "",
            apiKey: resolvedSearch.algolia?.apiKey || "",
            indexName: resolvedSearch.algolia?.indexName || "",
        },
        search: resolvedSearch,
    };
}

export function getCopyLinkConfig(): CopyLinkConfig {
    return projectConfig.copyLinkConfig || { removeLanguage: true };
}

export function getSocialButtons(): SocialButton[] {
    return projectConfig.socialButtons || [];
}

export function getSpecialBackPaths(): SpecialBackPath[] {
    return projectConfig.specialBackPaths || [];
}

export function getGiscusConfig(): GiscusConfig {
    return projectConfig.giscus;
}
