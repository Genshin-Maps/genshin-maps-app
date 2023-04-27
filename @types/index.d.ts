declare module "@lwahonen/ffi-napi" {
    import * as ffi_napi from "ffi-napi";
    export = ffi_napi;
}

declare module "@lwahonen/ref-napi" {
    import * as ref_napi from "ref-napi";
    export = ref_napi;
}

type AppInfo = {
    appVersion: string;
    libVersion?: string;
}

type AppConfig = {
    autoAppUpdate: boolean;
    autoLibUpdate: boolean;
    captureInterval: number;
    captureDelayOnError: number;
    useBitBltCapture: boolean;
}

type WorkerEvent = {
    event: string;
    data: any;
}

type CvatTrackData = {
    x: number;
    y: number;
    a: number;
    r: number;
    m: number;
    err: CvatTrackError;
}

type CvatTrackError = {
    errorCode?: number;
    errorList?: string[];
}