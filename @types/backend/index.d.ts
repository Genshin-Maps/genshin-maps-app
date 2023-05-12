import type { LibraryObject } from "ffi-napi";

export type AppConfig = {
    autoAppUpdate: boolean;
    autoLibUpdate: boolean;
    captureInterval: number;
    captureDelayOnError: number;
    useBitBltCapture: boolean;
};

export type AppInfo = {
    appVersion: string;
    libVersion?: string;
};

export type WorkerManagerConfig = {
    onTrackData?: (data: WorkerEventData) => void;
};

export type WorkerEvent = {
    event: string;
    data: WorkerEventData;
};

export type CvatTrackData = {
    x: number;
    y: number;
    a: number;
    r: number;
    m: number;
    err: CvatTrackError;
};

export type WorkerEventData = CvatTrackData | string | { echo: string };

export type CvatTrackError = {
    errorCode?: number;
    errorList?: string[];
};

export type CvatLibrary = LibraryObject | null;
