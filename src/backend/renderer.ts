import { BrowserWindow } from "electron";
import fs from "fs";
import path from "path";
import { getURLContent } from "@/backend/lib/utils";

export const render = (win: BrowserWindow) => {
    fs.readFile(path.join(__dirname, "../renderer/index.js"), (err, data) => {
        if (err) throw err;
        win.webContents.executeJavaScript(data.toString());
    });
};

export default (win: BrowserWindow) => {
    Promise.all([getURLContent(`https://github.com/Haytsir/Genshin-Paisitioning-Script/raw/gh-pages/userscript/genshin-paisitioning-script.user.js`)]).then((_) => {
        // const gps_js = get(results[0], "data", "");

        const globalJS = `
        function GM_getValue() {
            // TODO: 
        }
        function GM_setValue() {
            // TODO: 
        }
        /*
        window.bridge.onTrack((event, info) => {
            console.debug(info);
        });
        */
        // window.bridge.startTrack();
        `;
        win.webContents.executeJavaScript(globalJS);
        // TODO:
        // win.webContents.executeJavaScript(gps_js);
    });
};
