<template>
    <div ref="containerRef" class="hero-shader-background">
        <canvas ref="canvasRef" class="hero-shader-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount, watch } from "vue";
    import { inBrowser, useData } from "vitepress";

    interface Props {
        vertexShader?: string;
        fragmentShader?: string;
        preset?: string;
        speed?: number;
        paused?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        vertexShader: "",
        fragmentShader: "",
        preset: "wave",
        speed: 1,
        paused: false,
    });

    const { isDark } = useData();
    const containerRef = ref<HTMLElement | null>(null);
    const canvasRef = ref<HTMLCanvasElement | null>(null);

    let THREE: typeof import("three") | null = null;
    let renderer: InstanceType<typeof import("three").WebGLRenderer> | null =
        null;
    let scene: InstanceType<typeof import("three").Scene> | null = null;
    let camera: InstanceType<typeof import("three").OrthographicCamera> | null =
        null;
    let mesh: InstanceType<typeof import("three").Mesh> | null = null;
    let material: InstanceType<typeof import("three").ShaderMaterial> | null =
        null;
    let animationId: number | null = null;
    let startTime = 0;
    let resizeObserver: ResizeObserver | null = null;

    const PRESETS: Record<
        string,
        [
            [number, number, number],
            [number, number, number],
            [number, number, number],
        ]
    > = {
        wave: [
            [0.08, 0.15, 0.45],
            [0.45, 0.12, 0.55],
            [0.08, 0.45, 0.35],
        ],
        sunset: [
            [0.65, 0.25, 0.1],
            [0.85, 0.45, 0.2],
            [0.25, 0.1, 0.35],
        ],
        ocean: [
            [0.05, 0.2, 0.4],
            [0.12, 0.45, 0.6],
            [0.05, 0.35, 0.55],
        ],
        mono: [
            [0.2, 0.2, 0.2],
            [0.5, 0.5, 0.5],
            [0.8, 0.8, 0.8],
        ],
    };

    const DEFAULT_VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

    const DEFAULT_FRAGMENT = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float wave1 = sin(uTime * 0.4 + uv.x * 5.0) * 0.5 + 0.5;
  float wave2 = sin(uTime * 0.6 + uv.y * 4.0) * 0.5 + 0.5;
  vec3 colorMix = mix(uColor1, uColor2, wave1);
  colorMix = mix(colorMix, uColor3, wave2 * 0.5);
  gl_FragColor = vec4(colorMix, 0.8);
}
`;

    function applyPreset() {
        if (!material || !THREE) return;
        const palette = PRESETS[props.preset] || PRESETS.wave;
        material.uniforms.uColor1.value.set(...palette[0]);
        material.uniforms.uColor2.value.set(...palette[1]);
        material.uniforms.uColor3.value.set(...palette[2]);
    }

    function handleResize() {
        if (!containerRef.value || !renderer || !camera || !canvasRef.value)
            return;
        const rect = containerRef.value.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w <= 0 || h <= 0) return;
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.left = -1;
        camera.right = 1;
        camera.top = 1;
        camera.bottom = -1;
        camera.updateProjectionMatrix();
    }

    function renderFrame(timestamp: number) {
        if (!renderer || !scene || !camera || !material) return;
        if (startTime === 0) startTime = timestamp;
        if (!props.paused) {
            material.uniforms.uTime.value =
                (timestamp - startTime) * 0.001 * props.speed;
        }
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(renderFrame);
    }

    async function initScene() {
        if (!canvasRef.value) return;
        THREE = await import("three");
        renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.value,
            alpha: true,
            antialias: false,
        });
        renderer.setClearColor(new THREE.Color(0, 0, 0), 0);

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        material = new THREE.ShaderMaterial({
            vertexShader: props.vertexShader || DEFAULT_VERTEX,
            fragmentShader: props.fragmentShader || DEFAULT_FRAGMENT,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Vector3() },
                uColor2: { value: new THREE.Vector3() },
                uColor3: { value: new THREE.Vector3() },
            },
            transparent: true,
        });

        mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(mesh);

        applyPreset();
        handleResize();
        startTime = 0;
        animationId = requestAnimationFrame(renderFrame);

        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(containerRef.value as HTMLElement);
    }

    function cleanup() {
        if (animationId != null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        resizeObserver?.disconnect();
        resizeObserver = null;
        if (mesh) {
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE!.ShaderMaterial) {
                mesh.material.dispose();
            }
        }
        renderer?.dispose();
        renderer = null;
        scene = null;
        camera = null;
        mesh = null;
        material = null;
    }

    watch(
        () => props.preset,
        () => applyPreset(),
    );

    onMounted(() => {
        if (!inBrowser) return;
        initScene();
    });

    onBeforeUnmount(() => cleanup());
</script>

<style scoped>
    .hero-shader-background {
        position: absolute;
        inset: 0;
    }

    .hero-shader-canvas {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>
