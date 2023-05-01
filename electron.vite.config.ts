import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, "./src/backend/index.ts"),
                    trackWorker: path.resolve(__dirname, "./src/backend/lib/cvat/worker/trackWorker.ts"),
                },
            },
        },
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "./src") },
                { find: "@t", replacement: path.resolve(__dirname, "./@types") },
            ],
        },
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        build: {
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, "./src/preload/index.ts"),
                },
            },
        },
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "./src") },
                { find: "@t", replacement: path.resolve(__dirname, "./@types") },
            ],
        },
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        build: {
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, "./src/renderer/index.ts"),
                },
                output: {
                    entryFileNames: "[name].js",
                    manualChunks: undefined,
                },
            },
        },
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "./src") },
                { find: "@t", replacement: path.resolve(__dirname, "./@types") },
            ],
        },
        plugins: [svelte(), externalizeDepsPlugin(), cssInjectedByJsPlugin()],
    },
});
