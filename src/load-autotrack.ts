import { cvAutoTrack } from "./vendor/cvat-ffi";

export default () => {
    cvAutoTrack.startServe.async((err, res) => {
        console.log(res);
    });
};
