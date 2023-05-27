import type { ElectronAPI } from "@electron-toolkit/preload";
import type { IpcRendererEvent } from "electron";
import type { AppInfo, AppConfig, CvatTrackData } from "@t/backend";

export type Handler = (property: PropertyKey, value: unknown) => void;

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
    onUpdate: (callback: (event: IpcRendererEvent | RendererEvent, args: unknown) => void) => Electron.IpcRenderer | void;
    startTrack: () => Promise<void>;
    stopTrack: () => Promise<void>;
    onTrack: (callback: (event: IpcRendererEvent | RendererEvent, args: CvatTrackData) => void) => Electron.IpcRenderer | void;

    checkForUpdates?: (menuItem: string) => Promise<void>;
    toggleAlwaysOnTop?: () => void;
    openDevTools?: () => void;
    minimize?: () => void;
    toggleMaximize?: () => void;
    appQuit?: () => void;
}

type RendererEvent = {
    type: string;
    detail: unknown;
};

type MenuItem = {
    type?: string;
    label: string;
    icon?: string;
    logo?: ConstructorOfATypedSvelteComponent;
    accelerator?: string;
    submenu?: MenuItem[];
    enabled?: boolean;
    click?: (menuItem?: MenuItem, menuItems?: MenuItem[]) => void;
    class?: () => string;
};

type MapData = {
    blockKey: string;
    blockLeft: number;
    blockTop: number;
    boxLeft: number;
    boxTop: number;
    content: string;
    id: string;
    image: string;
    pin: number;
    point: number;
    state: boolean;
    tag: string[];
    x: number;
    y: number;
    category?: string;
};

type MapsState = {
    doubleTouch: boolean;
    fadeEffect: boolean;
    focusPoint: HTMLDivElement | null;
    iframe: boolean;
    mapsText: boolean;
    orientation: string;
    pinGroup: boolean;
    shortcut: { Control: boolean };
};

type MapsViewPin = Set<string>;

type PinLoad = {
    colorIndex: number;
    colorValue: string;
    creator: string;
    draw: HTMLDivElement;
    group: number;
    iconIndex: number;
    iconValue: string;
    id: string;
    index: number;
    lineValue: boolean;
    mapData: MapData[];
    mapName: string;
    maps: string;
    name: string;
    offcombine: boolean;
    opacityValue: number;
    origin: string;
    server: string;
    sizeValue: number;
    timer: boolean;
    type: number;
    version: number;
    category: { [string]: string };
};

type MapsPinLoad = PinLoad[] & {
    observe: (Handler) => void;
};

type MapsPinDraw = Map<string, MapData[]>;

declare global {
    interface Window {
        objectPanelWindow: HTMLDivElement | null;
        objectViewer: HTMLDivElement | null;
        objectLayerBase: HTMLDivElement | null;
        objectLayerPin: HTMLDivElement | null;
        objectTargetFilterBtn: HTMLDivElement | null;
        MAPS_Size: number;
        MAPS_ViewSize: number;
        MAPS_PointScale: number;
        MAPS_Scale: number;
        MAPS_RelativeX: number;
        MAPS_RelativeY: number;
        MAPS_ViewMobile: boolean;
        MAPS_Type: string;
        MAPS_State: MapsState;
        MAPS_ViewPin: MapsViewPin;
        MAPS_PinLoad: MapsPinLoad;
        MAPS_PinDraw: MapsPinDraw;
        drawMapsScale: (...args: unknown[]) => void;
        drawMapsLayer: (...args: unknown[]) => void;
        drawPinObject: (...args: unknown[]) => HTMLDivElement;
        setPinObjectRefresh: (...args: unknown[]) => void;
        changeMapsType: (...args: unknown[]) => void;
        removePin: (...args: unknown[]) => void;

        electron: ElectronAPI;
        bridge: Bridge;
        $store: unknown;
    }
}
