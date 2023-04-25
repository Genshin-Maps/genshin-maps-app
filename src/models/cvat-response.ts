import { Pointer } from "@lwahonen/ref-napi";

export interface CvatResponse {
    status?: boolean;
    data?: number | string | number[] | Pointer<number>[];
    // TODO: Pointer에서 값을 빼서 반환해야하는지 확인
}
