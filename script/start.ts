import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { build as viteBuild, createLogger, type ConfigEnv, type UserConfig, ViteDevServer } from "vite";
import colors from "picocolors";
import mainConfig from "../config/main.vite.config";
import preloadConfig from "../config/preload.vite.config";
import rendererConfig from "../config/renderer.vite.config";
import { startElectron } from "./electron";

type ServerConfig = {
    main: UserConfig;
    preload: UserConfig;
    renderer: UserConfig;
};

export async function createServer(config: ServerConfig): Promise<void> {
    const logger = createLogger("info");

    let server: ViteDevServer | undefined;
    let ps: ChildProcessWithoutNullStreams | undefined;

    if (config?.main) {
        const watchHook = (): void => {
            logger.info(colors.green(`\nrebuild the electron main process successfully`));

            if (ps) {
                logger.info(colors.cyan(`\n  waiting for electron to exit...`));

                ps.removeAllListeners();
                ps.kill();
                ps = startElectron(logger);

                logger.info(colors.green(`\nrestart electron app...`));
            }
        };
        await doBuild(config.main, watchHook);
        logger.info(colors.green(`\nbuild the electron main process successfully`));
    }

    if (config?.preload) {
        const watchHook = (): void => {
            logger.info(colors.green(`\nrebuild the electron preload files successfully`));

            // preload.cjs 파일 변경 시 backend에서 감지해서 수정되는건지 확인.
            if (server) {
                logger.info(colors.cyan(`\n  trigger renderer reload`));

                // server.ws.send({ type: "full-reload" });
            }
        };
        await doBuild(config.preload, watchHook);
        logger.info(colors.green(`\nbuild the electron preload files successfully`));
    }

    if (config?.renderer) {
        logger.info(colors.gray(`\n-----\n`));
        const watchHook = (): void => {
            logger.info(colors.green(`\nrebuild the electron renderer process successfully`));

            // if (ps) {
            //     logger.info(colors.cyan(`\n  waiting for electron to exit...`));

            //     ps.removeAllListeners();
            //     ps.kill();
            //     ps = startElectron(logger);

            //     logger.info(colors.green(`\nrestart electron app...`));
            // }
        };
        await doBuild(config.renderer, watchHook);
    }

    ps = startElectron(logger);

    logger.info(colors.green(`\nstart electron app...\n`));
}

async function doBuild(config: UserConfig = {}, watchHook: () => void): Promise<void> {
    return new Promise((resolve) => {
        let firstBundle = true;
        config.plugins = config.plugins || [];
        config.build = config.build || {};
        config.build.watch = {};

        const closeBundle = (): void => {
            if (firstBundle) {
                firstBundle = false;
                resolve();
            } else {
                watchHook();
            }
        };

        config.plugins.push({
            name: "vite:close-bundle-watcher",
            closeBundle,
        });

        viteBuild(config).then(() => {
            if (!config.build?.watch) {
                resolve();
            }
        });
    });
}

try {
    const configEnv: ConfigEnv = {
        mode: "development",
        command: "serve",
    };
    const inlineMainConfig = await (typeof mainConfig === "function" ? mainConfig(configEnv) : mainConfig);
    const inlinePreloadConfig = await (typeof preloadConfig === "function" ? preloadConfig(configEnv) : preloadConfig);
    const inlineRendererConfig = await (typeof rendererConfig === "function" ? rendererConfig(configEnv) : rendererConfig);
    await createServer({
        main: inlineMainConfig,
        preload: inlinePreloadConfig,
        renderer: inlineRendererConfig,
    });
} catch (e) {
    const error = e as Error;
    createLogger().error(colors.red(`error during serve:\n${error.stack}`), { error });
    process.exit(1);
}
