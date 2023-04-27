import ffi, { Library } from "@lwahonen/ffi-napi";
import ref from "@lwahonen/ref-napi";
import array from "ref-array-di";

export const ArrayType = array(ref);
export const bool = ref.types.bool;
export const boolPtr = ref.refType(bool);
export const int = ref.types.int;
export const intPtr = ref.refType(int);
export const long = ref.types.long;
export const double = ref.types.double;
export const doublePtr = ref.refType(double);
export const byteArray = ArrayType(ref.types.byte);
export const string = ref.types.CString;
export const stringPtr = ref.refType(string);

export function loadCvatLibrary(libPath: string): any {
    return ffi.Library(libPath, {
        verison: [bool, [byteArray]],
    
        init: ["bool", []],
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
    
        GetInfoLoadPicture: [bool, [byteArray, intPtr, doublePtr, doublePtr, doublePtr]],
        GetInfoLoadVideo: [bool, [byteArray, byteArray]],
    
        GetLastErr: [int, []],
        GetLastErrMsg: [int, [byteArray, int]],
        GetLastErrJson: [int, [stringPtr, int]],
    
        startServe: [bool, []],
        stopServe: [bool, []],
    
        GetCompileVersion: [bool, [stringPtr, int]],
        GetCompileTime: [bool, [byteArray, int]],
    });
}