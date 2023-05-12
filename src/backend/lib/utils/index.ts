export function isEmptyObject(param: object) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}
