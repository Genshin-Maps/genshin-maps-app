import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import type { Logger } from "vite";

const _require = createRequire(import.meta.url);

export function getElectronPath(): string {
    let electronExecPath = process.env.ELECTRON_EXEC_PATH || "";
    if (!electronExecPath) {
        const electronModulePath = path.dirname(_require.resolve("electron"));
        const pathFile = path.join(electronModulePath, "path.txt");
        let executablePath: string | undefined;
        if (fs.existsSync(pathFile)) {
            executablePath = fs.readFileSync(pathFile, "utf-8");
        }
        if (executablePath) {
            electronExecPath = path.join(electronModulePath, "dist", executablePath);
            process.env.ELECTRON_EXEC_PATH = electronExecPath;
        } else {
            throw new Error("Electron uninstall");
        }
    }
    return electronExecPath;
}

export function startElectron(logger: Logger): ChildProcessWithoutNullStreams {
    const electronPath = getElectronPath();

    const inspect = !!process.env.VSCODE_INSPECTOR_OPTIONS;

    const args: string[] = [];

    const ps = spawn(electronPath, ["."].concat(args));
    ps.stdout.on("data", (chunk) => {
        !inspect && chunk.toString().trim() && logger.info(chunk.toString());
    });
    ps.stderr.on("data", (chunk) => {
        !inspect && chunk.toString().trim() && logger.error(chunk.toString());
    });
    ps.on("close", process.exit);

    return ps;
}
