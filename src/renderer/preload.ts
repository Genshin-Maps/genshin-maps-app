import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

// 프런트엔드에서 사용할 수 있는 API를 노출시킨다.
// preload.js에서는 context가 renderer process이므로, backend에서 사용할 수 있는 전역 값 등을 사용할 수 없다.
// win.{apiKey}.{apiFunction}((event, value) => {}) 형태로 사용할 수 있다.
contextBridge.exposeInMainWorld('bridge', {
    getAppInfo: () => ipcRenderer.invoke('get-app-info'),
    getConfig: () => ipcRenderer.invoke('get-config'),
    setConfig: (config: AppConfig) => ipcRenderer.invoke('set-config', config),

    onUpdate: (callback: (event:IpcRendererEvent, args: any)=>{}) => ipcRenderer.on('on-update', callback),

    startTrack: () => ipcRenderer.invoke('start-track'),
    stopTrack: () => ipcRenderer.invoke('stop-track'),
    onTrack: (callback: (event:IpcRendererEvent, args: CvatTrackData)=>{}) => ipcRenderer.on('track', callback),
});

/* 
On Main:
win.webContents.send("on-update", updateData);

On renderer:
window.bridge.onUpdate((_event, args) => {
  console.log("onUpdate");
  console.log(args)
});
*/