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
    onTrackData?: (data: any) => void;
};

export type WorkerEvent = {
    event: string;
    data: any;
};

export type CvatTrackData = {
    x: number;
    y: number;
    a: number;
    r: number;
    m: number;
    err: CvatTrackError;
};

export type CvatTrackError = {
    errorCode?: number;
    errorList?: string[];
};
