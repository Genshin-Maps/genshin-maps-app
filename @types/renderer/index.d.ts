import type { ElectronAPI } from "@electron-toolkit/preload";
import type { AppConfig } from "@t/backend";

export type BackgroundImage = {
    name: string;
    url: string;
    size: number[];
    offset: number[];
};

interface Bridge {
    getAppInfo: () => Promise<AppInfo>;
    getConfig: () => Promise<AppConfig>;
    setConfig: (config: AppConfig) => Promise<AppConfig>;
    onUpdate: (callback: (event: IpcRendererEvent, args: any) => void) => Electron.IpcRenderer;
    startTrack: () => Promise<void>;
    stopTrack: () => Promise<void>;
    onTrack: (callback: (event: IpcRendererEvent, args: CvatTrackData) => void) => Electron.IpcRenderer;
}

declare global {
    interface Window {
        objectPanelWindow: HTMLDivElement | null;
        objectViewer: HTMLDivElement | null;
        objectLayerBase: HTMLDivElement | null;
        objectLayerPin: HTMLDivElement | null;
        objectTargetFilterBtn: HTMLDivElement | null;
        MAPS_Size: number;
        MAPS_PointScale: number;
        MAPS_Scale: number;
        MAPS_RelativeX: number;
        MAPS_RelativeY: number;
        MAPS_ViewMobile: boolean;
        MAPS_Type: string;
        drawMapsScale: (...args: any) => void;
        drawMapsLayer: (...args: any) => void;
        changeMapsType: (...args: any) => void;
        removePin: (...args: any) => void;

        electron: ElectronAPI;
        bridge: Bridge;
    }
}
