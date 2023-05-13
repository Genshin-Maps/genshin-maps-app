import { app } from "electron";
import path from "path";
import { type Pointer, alloc } from "@lwahonen/ref-napi";
import type { CvatTrackData, CvatTrackError, CvatLibrary } from "@t/backend";
import { isEmptyObject } from "@/backend/lib/utils";
import { loadCvatLibrary } from "@/backend/lib/cvat/cvat-ffi";

let unpackedPath: string;
if (app.isPackaged) {
    const basePath = path.dirname(app.getAppPath());
    unpackedPath = path.join(basePath, "app.asar.unpacked");
} else {
    unpackedPath = app.getAppPath();
}
const libPath = path.join(unpackedPath, "lib/cvAutoTrack/cvAutoTrack.dll");

// Cvat를 구현하는 싱글톤 클래스
export class LibCvat {
    private static _instance: LibCvat;
    private _lib: CvatLibrary | null;
    public isTracking = false;

    private constructor() {
        this._lib = null;
    }

    static get instance(): LibCvat {
        if (!LibCvat._instance) LibCvat._instance = new LibCvat();
        return LibCvat._instance;
    }
    public load(): boolean {
        if (this._lib == null) this._lib = loadCvatLibrary(libPath);

        return this._lib != null;
    }

    public unload(): boolean {
        if (this._lib != null) this._lib.close();

        return this._lib == null;
    }

    public init(): boolean {
        if (this._lib == null) return false;
        return this._lib.init();
    }

    public uninit(): boolean {
        if (this._lib == null) return false;
        return this._lib.uninit();
    }

    public track(): CvatTrackData {
        const ptrX: Pointer<number> = alloc("double*");
        const ptrY: Pointer<number> = alloc("double*");
        const ptrA: Pointer<number> = alloc("double*");
        const ptrR: Pointer<number> = alloc("double*");
        const ptrM: Pointer<number> = alloc("int*");
        let err: CvatTrackError = new Object(null); // TODO: 배열 처리 여부 결정

        if (!this.GetTransformOfMap(ptrX, ptrY, ptrA, ptrM)) {
            const errJsonText = this.GetLastErrJson();
            if (errJsonText.length > 0) {
                err = JSON.parse(errJsonText) as CvatTrackError;
            }
        }

        if (!this.GetRotation(ptrR)) {
            if (isEmptyObject(err)) {
                // 배열 처리시 필요없어지는 조건
                const errJsonText = this.GetLastErrJson();
                if (errJsonText.length > 0) {
                    err = JSON.parse(errJsonText) as CvatTrackError;
                }
            }
        }

        const trackData: CvatTrackData = {
            x: ptrX.readDoubleLE(),
            y: ptrY.readDoubleLE(),
            a: ptrA.readDoubleLE(),
            r: ptrR.readDoubleLE(),
            m: ptrM.readInt32LE(),
            err,
        };
        return trackData;
    }

    private GetTransformOfMap(x: Pointer<number>, y: Pointer<number>, a: Pointer<number>, m: Pointer<number>): boolean {
        if (this._lib == null) return false;
        return this._lib.GetTransformOfMap(x, y, a, m);
    }

    private GetRotation(r: Pointer<number>): boolean {
        if (this._lib == null) return false;
        return this._lib.GetRotation(r);
    }

    private GetLastErrJson(): string {
        if (this._lib == null) return "";
        const str: Pointer<string> = alloc("char*");
        this._lib.GetLastErrJson(str, 256);
        return str.readCString();
    }

    public GetCompileVersion(): string {
        if (this._lib == null) return "";
        const str: Pointer<string> = alloc("char*");
        this._lib.GetCompileVersion(str, 256);
        return str.readCString();
    }
}

/*
export const sub = () => {
    return {
        status: _startTrack(),
    };
};

export const unsub = () => {
    return {
        status: _stopTrack(),
    };
};

export const SetHandle = (handler: number) => {
    return {
        status: cvAutoTrack.SetHandle(handler),
    };
};

export const SetUseDx11CaptureMode = () => {
    return {
        status: cvAutoTrack.SetUseDx11CaptureMode(),
    };
};

export const SetUseBitbltCaptureMode = () => {
    return {
        status: cvAutoTrack.SetUseBitbltCaptureMode(),
    };
};

export const SetWorldCenter = (x: number, y: number) => {
    return {
        status: cvAutoTrack.SetWorldCenter(x, y),
    };
};

export const GetTransform = () => {
    let x: Pointer<number> = alloc("double*");
    let y: Pointer<number> = alloc("double*");
    let a: Pointer<number> = alloc("double*");
    let m: Pointer<number> = alloc("int*");

    const status = cvAutoTrack.GetTransformOfMap(x, y, a, m);
    return {
        status: status,
        data: [x, y, a, m],
    };
};

export const GetPosition = () => {
    let x: Pointer<number> = alloc("double*");
    let y: Pointer<number> = alloc("double*");
    let m: Pointer<number> = alloc("int*");

    const status = cvAutoTrack.GetPositionOfMap(x, y, m);
    return {
        status: status,
        data: [x, y, m],
    };
};

export const GetDirection = () => {
    let a: Pointer<number> = alloc("double*");

    const status = cvAutoTrack.GetDirection(a);
    return {
        status: status,
        data: a,
    };
};

export const GetRotation = () => {
    let a: Pointer<number> = alloc("double*");

    const status = cvAutoTrack.GetRotation(a);
    return {
        status: status,
        data: a,
    };
};

export const GetLastErr = () => {
    return {
        data: cvAutoTrack.GetLastErr(),
    };
};

export const DebugCaptureRes = () => {
    return {};
};
*/
