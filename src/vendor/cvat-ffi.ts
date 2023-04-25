import ffi from "@lwahonen/ffi-napi";
import ref from "@lwahonen/ref-napi";
import array from "ref-array-di";
import path from "path";

const ArrayType = array(ref);
const bool = ref.types.bool;
const boolPtr = ref.refType(bool);
const int = ref.types.int;
const intPtr = ref.refType(int);
const long = ref.types.long;
const double = ref.types.double;
const doublePtr = ref.refType(double);
const byteArray = ArrayType(ref.types.byte);
const string = ref.types.CString;
const stringPtr = ref.refType(string);

// TODO: 프로덕션 빌드에서 경로 문제 없는지 확인
export const cvAutoTrack = ffi.Library(path.join(__dirname, "../../vendor/cvAutoTrack/cvAutoTrack.dll"), {
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

    GetCompileVersion: [bool, [byteArray, int]],
    GetCompileTime: [bool, [byteArray, int]],
});
