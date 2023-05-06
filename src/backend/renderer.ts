import { BrowserWindow } from "electron";
import fs from "fs";
import path from "path";

export const render = async (win: BrowserWindow) => {
    // Load the remote URL for development or the local html file for production
    let data: string = fs.readFileSync(path.join(__dirname, "../renderer/index.cjs")).toString();
    win.webContents.executeJavaScript(data);
    win.webContents.executeJavaScript("window.bridge.startTrack();");
};
