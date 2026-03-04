import { withBase } from "vitepress";

const PROTOCOL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

export function resolveAssetWithBase(path?: string | null): string {
    if (!path) return "";

    const value = path.trim();
    if (!value) return "";

    if (value.startsWith("#")) return value;
    if (value.startsWith("//")) return value;
    if (value.startsWith("data:")) return value;
    if (value.startsWith("blob:")) return value;
    if (value.startsWith("./") || value.startsWith("../")) return value;
    if (PROTOCOL_RE.test(value)) return value;

    return withBase(value.startsWith("/") ? value : `/${value}`);
}
