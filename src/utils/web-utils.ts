import axios from "axios";

export const getURLContent = (url: string) => {
    return axios.get(url);
};
