import { build as viteBuild, createLogger, type ConfigEnv, type UserConfig } from "vite";
import colors from "picocolors";
import monkey from "vite-plugin-monkey";
import userConfig from "../config/renderer.vite.config";
import { type BuildInfo, getAddonsBuildInfo, getAutoTrackBuildInfo } from "../package-info";

const buildInfoMap = {
    addons: getAddonsBuildInfo(),
    "auto-track": getAutoTrackBuildInfo(),
};

export async function build(config: UserConfig = {}, buildInfo: BuildInfo) {
    config.plugins = config.plugins || [];
    config.plugins = config.plugins.slice(0, -1);

    config.define = {
        "process.env": Object.assign(
            {},
            {
                VITE_USERSCRIPT: true,
            },
            process.env,
        ),
    };

    const userscript = buildInfo.getUserscriptConfig();
    userscript.version = buildInfo.getVersion();
    config.plugins.push(
        monkey({
            clientAlias: "@monkey",
            build: {
                fileName: buildInfo.getFileName(),
            },
            entry: buildInfo.getEntryPoint(),
            userscript: userscript,
        }),
    );

    await viteBuild(config);
}

try {
    const configEnv: ConfigEnv = {
        mode: "userscript",
        command: "build",
    };
    const config = await (typeof userConfig === "function" ? userConfig(configEnv) : userConfig);
    const buildInfo = process.env.BUILD_TARGET === "addons" ? buildInfoMap["addons"] : buildInfoMap["auto-track"];
    await build(config, buildInfo as BuildInfo);
} catch (e) {
    const error = e as Error;
    createLogger().error(colors.red(`error during build:\n${error.stack}`), { error });
    process.exit(1);
}
