import path from "node:path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    build: {
        outDir: "out/renderer",
        target: "chrome112",
        minify: false,
        modulePreload: { polyfill: false },
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "../src/renderer/index.ts"),
            },
            output: [
                {
                    format: "cjs",
                    entryFileNames: "[name].cjs",
                    chunkFileNames: "assets/[name].cjs",
                },
            ],
        },
    },
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "../src") },
            { find: "@t", replacement: path.resolve(__dirname, "../@types") },
        ],
    },
    plugins: [svelte(), cssInjectedByJsPlugin()],
});
