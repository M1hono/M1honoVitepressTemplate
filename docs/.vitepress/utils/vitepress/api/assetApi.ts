import { withBase } from "vitepress";

class AssetPathResolver {
    private readonly protocolPattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

    resolve(path?: string | null): string {
        if (!path) return "";
        const value = path.trim();
        if (!value) return "";
        if (this.isDirect(value)) return value;
        return withBase(value.startsWith("/") ? value : `/${value}`);
    }

    private isDirect(value: string) {
        return (
            value.startsWith("#") ||
            value.startsWith("//") ||
            value.startsWith("data:") ||
            value.startsWith("blob:") ||
            value.startsWith("./") ||
            value.startsWith("../") ||
            this.protocolPattern.test(value)
        );
    }
}

const resolver = new AssetPathResolver();

export function resolveAssetWithBase(path?: string | null): string {
    return resolver.resolve(path);
}

