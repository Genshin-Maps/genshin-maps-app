export function isEmptyObject(param: any) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}
