import svgToMiniDataURI from "mini-svg-data-uri";
import type { Plugin } from "rollup";
import fs from "fs";
import { optimize, Config } from "svgo";

type PluginOptions = { noOptimize?: boolean; svgo?: Config };

//TODO: remove this once https://github.com/vitejs/vite/pull/2909 gets merged
export const svgLoader: (options?: PluginOptions) => Plugin = (options?: PluginOptions) => {
    // these options will always be overridden
    const overrideOptions: PluginOptions = {
        svgo: {
            // set multipass to allow all optimizations
            multipass: true,
            // setting datauri to undefined will get pure svg
            // since we want to encode with mini-svg-data-uri
            datauri: undefined,
        },
    };
    options = options ?? overrideOptions;
    options.svgo = Object.assign(options.svgo ?? {}, overrideOptions.svgo);
    return {
        name: "vite-svg-patch-plugin",
        transform: function (code, id) {
            if (id.endsWith(".svg")) {
                const extractedSvg = fs.readFileSync(id, "utf8");
                const optimized = options?.noOptimize ? extractedSvg : optimize(extractedSvg, options?.svgo).data;
                const datauri = svgToMiniDataURI.toSrcset(optimized);
                return `export default "${datauri}"`;
            }
            return code;
        },
    };
};

export const preventSVGEmit = () => {
    return {
        generateBundle(_opts, bundle) {
            for (const key in bundle) {
                if (key.endsWith(".svg")) {
                    delete bundle[key];
                }
            }
        },
    };
};
