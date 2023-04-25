import { contextBridge, ipcRenderer } from "electron";


// 프런트엔드에서 사용할 수 있는 API를 노출시킨다.
// win.{apiKey}.{apiFunction}((event, value) => {}) 형태로 사용할 수 있다.
contextBridge.exposeInMainWorld('bridge', {
    cvatInfo: () => {
        ipcRenderer.on('cvatInfo', (event, arg ) => {
            console.log(arg);
        });
    }
});