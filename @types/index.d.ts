declare module "@lwahonen/ffi-napi" {
    import * as ffi_napi from "ffi-napi";
    export = ffi_napi;
}

declare module "@lwahonen/ref-napi" {
    import * as ref_napi from "ref-napi";
    export = ref_napi;
}

declare module "@monkey" {
    export declare const unsafeWindow: Window;
}

declare module "$" {}
