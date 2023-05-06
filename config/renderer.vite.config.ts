import path from "node:path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import alias from "@rollup/plugin-alias";
import { svgLoader, preventSVGEmit } from "../plugins/svgLoader";

const __dirname = path.resolve();

export default defineConfig({
    build: {
        outDir: "out/renderer",
        target: "chrome112",
        minify: false,
        assetsInlineLimit: 0,
        modulePreload: { polyfill: false },
        rollupOptions: {
            input: {
                index: path.join(__dirname, "src/renderer/index.ts"),
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
            { find: "@", replacement: path.join(__dirname, "src") },
            { find: "@t", replacement: path.join(__dirname, "@types") },
        ],
    },
    plugins: [
        svgLoader(),
        preventSVGEmit(),
        svelte({
            preprocess: sveltePreprocess({ scss: true, typescript: true }),
        }),
        cssInjectedByJsPlugin(),
        alias({
            entries: {
                "@monkey": path.resolve(__dirname, "src/renderer/lib/monkey/index.ts"),
            },
        }),
    ],
});
