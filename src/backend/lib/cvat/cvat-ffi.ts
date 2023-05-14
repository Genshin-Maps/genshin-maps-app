import ffi from "@lwahonen/ffi-napi";
import ref from "@lwahonen/ref-napi";
import logger from "electron-log";
import type { CvatLibrary } from "@t/backend";
import { checkForUpdates } from "@/backend/lib/cvat/cvat-updater";

const EXT = (Library.EXT = {
    linux: ".so",
    linux2: ".so",
    sunos: ".so",
    solaris: ".so",
    freebsd: ".so",
    openbsd: ".so",
    darwin: ".dylib",
    mac: ".dylib",
    win32: ".dll",
}[process.platform]);

function Library(libfile: string, funcs: object) {
    if (libfile && typeof libfile === "string" && libfile.indexOf(EXT) === -1) {
        libfile += EXT;
    }

    const dl: ffi.DynamicLibrary = new ffi.DynamicLibrary(libfile, ffi.DynamicLibrary.FLAGS.RTLD_NOW);
    const lib: CvatLibrary = {} as CvatLibrary;

    Object.keys(funcs || {}).forEach(function (func) {
        const fptr = dl.get(func);
        const info = funcs[func];

        if (fptr.isNull()) {
            throw new Error('Library: "' + dl.path() + '" returned NULL function pointer for "' + func + '"');
        }

        const resultType = info[0];
        const paramTypes = info[1];
        const fopts = info[2];
        const abi = fopts && fopts.abi;
        const async = fopts && fopts.async;
        const varargs = fopts && fopts.varargs;

        if (varargs) {
            lib[func] = ffi.VariadicForeignFunction(fptr, resultType, paramTypes, abi);
        } else {
            const ff = ffi.ForeignFunction(fptr, resultType, paramTypes, abi);
            lib[func] = async ? ff.async : ff;
        }
    });

    lib["close"] = () => {
        return dl.close();
    };

    return lib;
}

export const bool = ref.types.bool;
export const boolPtr = ref.refType(bool);
export const int = ref.types.int;
export const intPtr = ref.refType(int);
export const long = ref.types.long;
export const double = ref.types.double;
export const doublePtr = ref.refType(double);
export const string = ref.types.CString;
export const stringPtr = ref.refType(string);

export async function loadCvatLibrary(libPath: string): Promise<CvatLibrary> {
    logger.info(`load cvat library from: ${libPath}`);
    await checkForUpdates();

    return Library(libPath, {
        verison: [bool, [stringPtr]],

        init: [bool, []],
        uninit: [bool, []],

        SetUseBitbltCaptureMode: [bool, []],
        SetUseDx11CaptureMode: [bool, []],

        SetHandle: [bool, [long]],
        SetWorldCenter: [bool, [double, double]],
        SetWorldScale: [bool, [double]],

        GetTransformOfMap: [bool, [doublePtr, doublePtr, doublePtr, intPtr]],
        GetPositionOfMap: [bool, [doublePtr, doublePtr, intPtr]],
        GetDirection: [bool, [doublePtr]],
        GetRotation: [bool, [doublePtr]],

        GetStar: [bool, [doublePtr, doublePtr, boolPtr]],
        GetStarJson: [bool, []],

        GetUID: [bool, [intPtr]],

        GetInfoLoadPicture: [bool, [stringPtr, intPtr, doublePtr, doublePtr, doublePtr]],
        GetInfoLoadVideo: [bool, [stringPtr, stringPtr]],

        GetLastErr: [int, []],
        GetLastErrMsg: [int, [stringPtr, int]],
        GetLastErrJson: [int, [stringPtr, int]],

        startServe: [bool, []],
        stopServe: [bool, []],

        GetCompileVersion: [bool, [stringPtr, int]],
        GetCompileTime: [bool, [stringPtr, int]],
    });
}
