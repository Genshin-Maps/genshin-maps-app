import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { Bridge } from "@t/renderer";

// 프런트엔드에서 사용할 수 있는 API를 노출시킨다.
// preload.js에서는 context가 renderer process이므로, backend에서 사용할 수 있는 전역 값 등을 사용할 수 없다.
// win.{apiKey}.{apiFunction}((event, value) => {}) 형태로 사용할 수 있다.
const bridge: Bridge = {
    getAppInfo: () => ipcRenderer.invoke("get-app-info"),
    getConfig: () => ipcRenderer.invoke("get-config"),
    setConfig: (config) => ipcRenderer.invoke("set-config", config),

    onUpdate: (callback) => ipcRenderer.on("on-update", callback),

    startTrack: () => ipcRenderer.invoke("start-track"),
    stopTrack: () => ipcRenderer.invoke("stop-track"),
    onTrack: (callback) => ipcRenderer.on("track", callback),
};
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI);
        contextBridge.exposeInMainWorld("bridge", bridge);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
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
