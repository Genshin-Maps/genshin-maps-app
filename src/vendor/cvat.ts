import { Pointer, alloc } from "@lwahonen/ref-napi";
import { Worker, isMainThread, workerData } from "worker_threads";
import { cvAutoTrack } from "./cvat-ffi";

let isBroadcast: boolean = false;

const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function _startTrack() {
    if (isBroadcast) return true;
    if (cvAutoTrack.init()) {
        isBroadcast = true;
        _threadedTrack();
        return true;
    }
    return false;
}

function _stopTrack() {
    if (!isBroadcast) return true;
    if (cvAutoTrack.uninit()) {
        isBroadcast = false;
        _threadedTrack();
        return true;
    }
    return false;
}

function _track(x: Pointer<number>, y: Pointer<number>, a: Pointer<number>, r: Pointer<number>, m: Pointer<number>) {
    if (!cvAutoTrack.GetTransformOfMap(x, y, a, m)) {
        return false;
    }
    if (!cvAutoTrack.GetRotation(r)) {
        return false;
    }
    return true;
}

function _threadedTrack() {
    if (isMainThread) {
        // 메인 스레드
        const worker = new Worker(__filename, {
            workerData: {
                isBroadcast: isBroadcast,
            },
        });
    } else {
        // 워커스레드
        while (workerData.isBroadcast) {
            let x: Pointer<number> = alloc("double*");
            let y: Pointer<number> = alloc("double*");
            let a: Pointer<number> = alloc("double*");
            let r: Pointer<number> = alloc("double*");
            let m: Pointer<number> = alloc("int*");
            const status = _track(x, y, a, r, m);
            const err = cvAutoTrack.GetLastErr();

            // TODO: status 값에 따라 분기 처리
            let errStr: Pointer<string> = alloc("char*");
            cvAutoTrack.GetLastErrJson(errStr, 1024);
            const broadcast = {
                action: "cvautotrack",
                data: {
                    x: x,
                    y: y,
                    a: a,
                    r: r,
                    m: m,
                    e: err,
                    j: errStr,
                    s: status,
                },
            };
            // TODO:
            // ws_broadcast(json);
            _sleep(err > 0 ? 800 : 250);
        }
    }
}

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

export const track = () => {
    let x: Pointer<number> = alloc("double*");
    let y: Pointer<number> = alloc("double*");
    let a: Pointer<number> = alloc("double*");
    let r: Pointer<number> = alloc("double*");
    let m: Pointer<number> = alloc("int*");

    const status = _track(x, y, a, r, m);
    return {
        status: status,
        data: [x, y, a, r, m],
    };
};

export const init = () => {
    return {
        status: cvAutoTrack.init(),
    };
};

export const uninit = () => {
    return {
        status: cvAutoTrack.uninit(),
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
