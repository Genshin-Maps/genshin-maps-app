import path from "node:path";
import { builtinModules } from "node:module";
import { defineConfig, loadEnv } from "vite";
import { externalizeDepsPlugin } from "../plugins/externalizeDeps";

const __dirname = path.resolve();

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, path.join(process.cwd(), "env"), "") };

    mode = mode || "production";
    return {
        build: {
            outDir: "out/preload",
            target: "node18.14",
            minify: "esbuild",
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, "src/preload/index.ts"),
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
                { find: "@", replacement: path.resolve(__dirname, "src") },
                { find: "@t", replacement: path.resolve(__dirname, "@types") },
            ],
        },
        plugins: [externalizeDepsPlugin()],
    };
});
