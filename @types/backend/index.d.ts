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

export type CvatLibrary = {
    version(versionBuff: string): boolean;

    init(): boolean;
    uninit(): boolean;

    startServe(): boolean;
    stopServe(): boolean;

    SetUseBitbltCaptureMode(): boolean;
    SetUseDx11CaptureMode(): boolean;

    SetHwnd(handle: number): boolean;
    SetWorldCenter(x: number, y: number): boolean;
    SetWorldScale(scale: number): boolean;

    GetTransformOfMap(x: Pointer<number>, y: Pointer<number>, a: Pointer<number>, m: Pointer<number>): boolean;
    GetPositionOfMap(x: Pointer<number>, y: Pointer<number>, m: Pointer<number>): boolean;
    GetDirection(a: Pointer<number>): boolean;
    GetRotation(r: Pointer<number>): boolean;

    GetStar(x: Pointer<number>, y: Pointer<number>, isEnd: Pointer<boolean>): boolean;
    GetStarJson(jsonBuff: Pointer<string>): boolean;

    GetUID(uid: Pointer<number>): boolean;

    GetInfoLoadPicture(path: Pointer<string>, uid: Pointer<number>, x: Pointer<number>, y: Pointer<number>, a: Pointer<number>): boolean;
    GetInfoLoadVideo(path: Pointer<string>, pathOutFile: Pointer<string>): boolean;

    GetLastErr(): number;
    GetLastErrMsg(msgBuff: Pointer<string>, buffSize: number): number;
    GetLastErrJson(jsonBuff: Pointer<string>, buffSize: number): number;

    GetCompileVersion(versionBuff: Pointer<string>, buffSize: number): boolean;
    GetCompileTime(timeBuff: Pointer<string>, buffSize: number): boolean;

    // Custom
    close(): number;
};
