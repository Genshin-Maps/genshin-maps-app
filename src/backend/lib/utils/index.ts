import axios from "axios";

export const getURLContent = (url: string) => {
    return axios.get(url);
};

const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function isEmptyObject(param: any) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}