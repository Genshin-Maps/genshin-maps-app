import path from "node:path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { svgLoader, preventSVGEmit } from "../plugins/svgLoader";

export default defineConfig({
    build: {
        outDir: "out/renderer",
        target: "chrome112",
        minify: false,
        assetsInlineLimit: 0,
        modulePreload: { polyfill: false },
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "../src/renderer/index.ts"),
            },
            output: {
                format: "cjs",
                entryFileNames: "[name].cjs",
                manualChunks: {},
            },
        },
    },
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "../src") },
            { find: "@t", replacement: path.resolve(__dirname, "../@types") },
        ],
    },
    plugins: [
        svgLoader(),
        preventSVGEmit(),
        svelte({
            preprocess: sveltePreprocess({ scss: true, typescript: true }),
        }),
        cssInjectedByJsPlugin()
    ],
});
