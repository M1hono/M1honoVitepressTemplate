import type { App } from 'vue';
import {
    comment,
    ArticleMetadata,
    Linkcard,
    ResponsibleEditor,
    MdDialog,
    MdMultiPageDialog,
    CustomAlert
} from "../../theme/components/content";
import { YoutubeVideo, BilibiliVideo, PdfViewer } from "../../theme/components/media";
import { MNavLinks } from "../../theme/components/navigation";
import {
    Buttons,
    Carousels,
    Animation,
    Preview,
    NotFound,
} from "../../theme/components/ui";
import MagicMoveContainer from "../../theme/components/ui/MagicMoveContainer.vue";
import { defineAsyncComponent } from 'vue';
import { LiteTree } from "@lite-tree/vue";
import { TagsPage } from "../../theme/components/content";

const CommitsCounter = defineAsyncComponent(() => import("../../theme/components/content/CommitsCounter.vue"));
const Contributors = defineAsyncComponent(() => import("../../theme/components/content/Contributors.vue"));
const MinecraftAdvancedDamageChart = defineAsyncComponent(() => import("../../theme/components/content/minecraft-advanced-damage-chart.vue"));

const components = {
    MdCarousel: Carousels,
    YoutubeVideo,
    BilibiliVideo,
    DamageChart: MinecraftAdvancedDamageChart,
    ArticleMetadata,
    Linkcard,
    commitsCounter: CommitsCounter,
    MNavLinks,
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
    TagsPage
};

export const registerComponents = (app: App) => {
    Object.entries(components).forEach(([name, component]) => {
        if (component) {
            app.component(name, component);
        }
    });
}; 