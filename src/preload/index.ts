import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { IpcRenderer, IpcRendererEvent } from "electron";
import type { Bridge } from "@t/renderer";
import type { CvatTrackData } from "@t/backend";

class IpcHelper {
    ipcRenderer: IpcRenderer;

    constructor(ipcRenderer: IpcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    invoke(channel: string) {
        return (...args: unknown[]) => this.ipcRenderer.invoke(channel, ...args).catch((err) => console.error(err));
    }

    on(channel: string) {
        return (callback: (event: IpcRendererEvent, args: CvatTrackData) => void) => this.ipcRenderer.on(channel, callback);
    }
}

const ipcHelper = new IpcHelper(ipcRenderer);

// 프런트엔드에서 사용할 수 있는 API를 노출시킨다.
// preload.js에서는 context가 renderer process이므로, backend에서 사용할 수 있는 전역 값 등을 사용할 수 없다.
// win.{apiKey}.{apiFunction}((event, value) => {}) 형태로 사용할 수 있다.
const bridge: Bridge = {
    getAppInfo: ipcHelper.invoke("get-app-info"),
    getConfig: ipcHelper.invoke("get-config"),
    setConfig: ipcHelper.invoke("set-config"),

    onUpdate: ipcHelper.on("on-update"),

    startTrack: ipcHelper.invoke("start-track"),
    stopTrack: ipcHelper.invoke("stop-track"),
    onTrack: ipcHelper.on("track"),
};

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI);
        contextBridge.exposeInMainWorld("bridge", bridge);
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.bridge = bridge;
}

/*
On Main:
win.webContents.send("on-update", updateData);

On renderer:
window.bridge.onUpdate((_event, args) => {
  console.log("onUpdate");
  console.log(args)
});
*/
