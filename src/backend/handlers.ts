import { IpcMainInvokeEvent, app, BrowserWindow } from "electron";
import { getConfig, setConfig } from "./config";
import { mainWindow } from './main'
import { CvatWorkerManager } from "./lib/cvat/cvatWorkerManager";
import { LibCvat } from "./lib/cvat";

const cvat = LibCvat.instance;
cvat.load();

export function getAppInfoHandler(): AppInfo {
    return {
        appVersion: app.getVersion(),
        libVersion: cvat.GetCompileVersion(),
    }
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
    libManager.init();
    libManager.startTrack();
    libManager.onTrackData = (data) => {
        console.log('on track data')
        if(mainWindow)
            mainWindow.webContents.send('track', data);
    }
}

export function stopTrackHandler(): void {
    const libManager = CvatWorkerManager.instance;
    libManager.stopTrack();
}