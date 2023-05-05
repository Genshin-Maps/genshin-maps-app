import path from "node:path";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";
import { externalizeDepsPlugin } from "../plugins/externalizeDeps";

export default defineConfig({
    build: {
        outDir: "out/preload",
        target: "node18.14",
        minify: false,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "../src/preload/index.ts"),
            },
            output: [
                {
                    format: "cjs",
                    entryFileNames: "[name].cjs",
                    chunkFileNames: "assets/[name].cjs",
                },
            ],
            external: ["electron", ...builtinModules.flatMap((m) => [m, `node:${m}`])],
        },
    },
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "../src") },
            { find: "@t", replacement: path.resolve(__dirname, "../@types") },
        ],
    },
    plugins: [externalizeDepsPlugin()],
});
