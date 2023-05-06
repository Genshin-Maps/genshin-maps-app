import { type IpcMainInvokeEvent, app } from "electron";
import type { AppConfig, AppInfo } from "@t/backend";
import { mainWindow } from "@/backend";
import { getConfig, setConfig } from "@/backend/config";
import { LibCvat } from "@/backend/lib/cvat";
import { CvatWorkerManager } from "@/backend/lib/cvat/cvatWorkerManager";

const cvat = LibCvat.instance;
cvat.load();

export function getAppInfoHandler(): AppInfo {
    return {
        appVersion: app.getVersion(),
        libVersion: cvat.GetCompileVersion(),
    };
}

export function getConfigHandler(): AppConfig {
    return getConfig();
}

export function setConfigHandler(_event: IpcMainInvokeEvent, config: AppConfig): AppConfig {
    setConfig(config);
    return getConfig();
}

export function startTrackHandler(): void {
    const libManager = CvatWorkerManager.instance;
    libManager.init({
        onTrackData: (data) => {
            console.log(`on track data: ${JSON.stringify(data)}`);
            if (mainWindow) mainWindow.webContents.send("track", data);
        },
    });
    libManager.startTrack();
}

export function stopTrackHandler(): void {
    const libManager = CvatWorkerManager.instance;
    libManager.stopTrack();
}
