import type { AppConfig, AppInfo, CvatTrackData } from "@t/backend";
import type { Bridge, RendererEvent } from "@t/renderer";

// TODO: userscript인 경우 electronAPI 사용 불가능
// tray로 프로그램을 숨기고, ws로 통신하는 방식으로 변경해야함
const bridge: Bridge = {
    getAppInfo: () => {
        console.log("getAppInfo");
        return Promise.resolve({} as AppInfo);
    },
    getConfig: () => {
        console.log("getConfig");
        return Promise.resolve({} as AppConfig);
    },
    setConfig: () => {
        console.log("setConfig");
        return Promise.resolve({} as AppConfig);
    },

    onUpdate: (callback: (event: RendererEvent, args: CvatTrackData) => void) => {
        if (callback) {
            console.log(callback);
        }
        console.log("onUpdate");
    },

    startTrack: () => {
        console.log("startTrack");
        return Promise.resolve();
    },
    stopTrack: () => {
        console.log("stopTrack");
        return Promise.resolve();
    },
    onTrack: (callback: (event: RendererEvent, args: CvatTrackData) => void) => {
        if (callback) {
            console.log(callback);
        }
        console.log("onTrack");
    },
};

export default bridge;
