import type { App } from "vue";
import {
    comment,
    ArticleMetadata,
    Linkcard,
    ResponsibleEditor,
    MdDialog,
    MdMultiPageDialog,
    CustomAlert,
    ChatPanel,
    ChatMessage,
    Bills,
    MarkMapView,
    VChart,
    ShaderEffectBlock,
} from "@utils/vitepress/componentRegistry/contentRegistry";
import {
    YoutubeVideo,
    BilibiliVideo,
    PdfViewer,
} from "@utils/vitepress/componentRegistry/mediaRegistry";
import {
    Buttons,
    Carousels,
    Steps,
    Animation,
    Preview,
    NotFound,
} from "@utils/vitepress/componentRegistry/uiRegistry";
import MagicMoveContainer from "@components/ui/MagicMoveContainer.vue";
import { defineAsyncComponent } from "vue";
import { LiteTree } from "@lite-tree/vue";
import { TagsPage } from "@utils/vitepress/componentRegistry/contentRegistry";

const CommitsCounter = defineAsyncComponent(
    () => import("@components/content/CommitsCounter.vue"),
);
const Contributors = defineAsyncComponent(
    () => import("@components/content/Contributors.vue"),
);

const components = {
    MdCarousel: Carousels,
    VPSteps: Steps,
    YoutubeVideo,
    BilibiliVideo,
    ArticleMetadata,
    Linkcard,
    commitsCounter: CommitsCounter,
    PdfViewer,
    LiteTree,
    MagicMoveContainer,
    Contributors,
    Buttons,
    comment,
    ResponsibleEditor,
    Animation,
    Preview,
    NotFound,
    MdDialog,
    MdMultiPageDialog,
    CustomAlert,
    TagsPage,
    ChatPanel,
    ChatMessage,
    Bills,
    MarkMapView,
    VChart,
    ShaderEffectBlock,
};

console.log("Registered components:", Object.keys(components));

/**
 * Registers global components and aliases for VitePress.
 */
export const registerComponents = (app: App) => {
    Object.entries(components).forEach(([name, component]) => {
        if (component) {
            app.component(name, component);
        }
    });
};
