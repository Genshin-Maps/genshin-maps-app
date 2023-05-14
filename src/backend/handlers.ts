import { type IpcMainInvokeEvent, app, ipcMain } from "electron";
import type { AppConfig, AppInfo } from "@t/backend";
import { mainWindow } from "@/backend";
import { getConfig, setConfig } from "@/backend/config";
import { LibCvat } from "@/backend/lib/cvat";
import { CvatWorkerManager } from "@/backend/lib/cvat/cvatWorkerManager";
import { toggleAlwaysOnTop, checkforUpdates, minimizeWindow, toggleMaximizeRestoreWindow, openDevTools, appQuit } from "@/backend/menu";

const cvat = LibCvat.instance;

function getAppInfoHandler(): AppInfo {
    return {
        appVersion: app.getVersion(),
        libVersion: cvat.GetCompileVersion(),
    };
}

function getConfigHandler(): AppConfig {
    return getConfig();
}

function setConfigHandler(_event: IpcMainInvokeEvent, config: AppConfig): AppConfig {
    setConfig(config);
    return getConfig();
}

function startTrackHandler(): void {
    const libManager = CvatWorkerManager.instance;
    libManager.init({
        onTrackData: (data) => {
            console.log(`on track data: ${JSON.stringify(data)}`);
            if (mainWindow) mainWindow.webContents.send("track", data);
        },
    });
    libManager.startTrack();
}

function stopTrackHandler(): void {
    const libManager = CvatWorkerManager.instance;
    libManager.stopTrack();
}

export async function setHandlers(): Promise<void> {
    await cvat.load();

    // --- App Info
    ipcMain.handle("get-app-info", getAppInfoHandler);

    // --- Config
    ipcMain.handle("get-config", getConfigHandler);
    ipcMain.handle("set-config", setConfigHandler);

    // --- Autotrack
    ipcMain.handle("start-track", startTrackHandler);
    ipcMain.handle("stop-track", stopTrackHandler);

    // --- Menu Handlers
    ipcMain.on("toggle-always-on-top", toggleAlwaysOnTop);
    ipcMain.handle("check-for-updates", checkforUpdates);
    ipcMain.on("minimize", minimizeWindow);
    ipcMain.on("toggle-maximize", toggleMaximizeRestoreWindow);
    ipcMain.on("open-devtools", openDevTools);
    ipcMain.on("app-quit", appQuit);
}
