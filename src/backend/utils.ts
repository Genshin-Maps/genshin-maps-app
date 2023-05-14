import { app } from "electron";
import path from "path";

export function isEmptyObject(param: object) {
    return Object.keys(param).length === 0 && param.constructor === Object;
}

export function getInstallationPath() {
    const appPath = app.isPackaged ? path.dirname(app.getPath("exe")) : app.getAppPath();
    return appPath;
}

export function getLibDirPath() {
    return path.join(getInstallationPath(), "lib/cvAutoTrack");
}
