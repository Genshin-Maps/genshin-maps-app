import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
    main: {
        build: {
            lib: {
                entry: "./src/backend/index.ts",
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
            lib: {
                entry: "./src/preload/index.ts",
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
                    index: "./src/renderer/index.ts",
                },
                output: {
                    entryFileNames: "[name].js",
                },
            },
        },
        resolve: {
            alias: [
                { find: "@", replacement: path.resolve(__dirname, "./src") },
                { find: "@t", replacement: path.resolve(__dirname, "./@types") },
            ],
        },
        plugins: [svelte(), externalizeDepsPlugin()],
    },
});
