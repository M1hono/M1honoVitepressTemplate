<template>
    <div class="echarts-container" :style="{ width, height }">
        <ClientOnly>
            <VueEChart
                :option="options"
                :theme="computedTheme"
                :autoresize="true"
                class="vue-echarts"
            />
        </ClientOnly>
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useData } from "vitepress";
    import { defineAsyncComponent } from "vue";

    const VueEChart = defineAsyncComponent(async () => {
        const { default: VChart } = await import("vue-echarts");
        const { use } = await import("echarts/core");

        const {
            LineChart,
            BarChart,
            PieChart,
            ScatterChart,
            RadarChart,
            GaugeChart,
            FunnelChart,
            HeatmapChart,
            SankeyChart,
            GraphChart,
            TreeChart,
            TreemapChart,
            SunburstChart,
            CandlestickChart,
            BoxplotChart,
            ParallelChart,
            ThemeRiverChart,
            PictorialBarChart,
        } = await import("echarts/charts");

        const {
            TitleComponent,
            TooltipComponent,
            LegendComponent,
            GridComponent,
            DatasetComponent,
            TransformComponent,
            ToolboxComponent,
            DataZoomComponent,
            VisualMapComponent,
            TimelineComponent,
            CalendarComponent,
            GraphicComponent,
            MarkPointComponent,
            MarkLineComponent,
            MarkAreaComponent,
            AriaComponent,
            ParallelComponent,
            SingleAxisComponent,
            RadarComponent,
        } = await import("echarts/components");

        const { CanvasRenderer } = await import("echarts/renderers");

        use([
            LineChart,
            BarChart,
            PieChart,
            ScatterChart,
            RadarChart,
            GaugeChart,
            FunnelChart,
            HeatmapChart,
            SankeyChart,
            GraphChart,
            TreeChart,
            TreemapChart,
            SunburstChart,
            CandlestickChart,
            BoxplotChart,
            ParallelChart,
            ThemeRiverChart,
            PictorialBarChart,
            TitleComponent,
            TooltipComponent,
            LegendComponent,
            GridComponent,
            DatasetComponent,
            TransformComponent,
            ToolboxComponent,
            DataZoomComponent,
            VisualMapComponent,
            TimelineComponent,
            CalendarComponent,
            GraphicComponent,
            MarkPointComponent,
            MarkLineComponent,
            MarkAreaComponent,
            AriaComponent,
            ParallelComponent,
            SingleAxisComponent,
            RadarComponent,
            CanvasRenderer,
        ]);

        return VChart;
    });

    const props = defineProps({
        options: {
            type: Object,
            required: true,
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "400px",
        },
        theme: {
            type: String,
            default: "auto",
        },
    });

    const { isDark } = useData();

    const computedTheme = computed(() => {
        if (props.theme === "auto") {
            return isDark.value ? "dark" : null;
        }
        return props.theme;
    });
</script>

<style scoped>
    .echarts-container {
        border-radius: 8px;
        margin: 20px 0;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
    }

    .vue-echarts {
        width: 100% !important;
        height: 100% !important;
        min-height: 300px;
    }

    @media (max-width: 768px) {
        .echarts-container {
            margin: 16px 0;
        }

        .vue-echarts {
            min-height: 250px;
        }
    }
</style>
