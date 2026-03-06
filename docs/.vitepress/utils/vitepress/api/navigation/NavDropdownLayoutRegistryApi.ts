import type { Component } from "vue";

interface NavDropdownLayoutRegistration {
    layout: string;
    component: Component;
}

function normalizeNavLayout(value: unknown): string {
    if (typeof value !== "string") return "";
    return value.trim().toLowerCase();
}

class NavDropdownLayoutRegistryApi {
    private readonly layoutMap = new Map<string, Component>();

    registerLayout(layout: string, component: Component): void {
        const normalizedLayout = normalizeNavLayout(layout);
        if (!normalizedLayout || !component) return;
        this.layoutMap.set(normalizedLayout, component);
    }

    registerLayouts(registrations: NavDropdownLayoutRegistration[]): void {
        for (const registration of registrations) {
            this.registerLayout(registration.layout, registration.component);
        }
    }

    hasLayout(layout: string): boolean {
        return this.layoutMap.has(normalizeNavLayout(layout));
    }

    resolveLayoutComponent(layout: unknown, explicitComponent?: Component): Component | undefined {
        if (explicitComponent) return explicitComponent;
        const normalizedLayout = normalizeNavLayout(layout);
        if (!normalizedLayout) return undefined;
        return this.layoutMap.get(normalizedLayout);
    }

    listLayouts(): string[] {
        return Array.from(this.layoutMap.keys()).sort();
    }
}

export const navDropdownLayoutRegistry = new NavDropdownLayoutRegistryApi();

