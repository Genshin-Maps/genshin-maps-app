import { BrowserWindow } from "electron";
import fs from "fs";
import path from "path";
import { getURLContent } from "@/backend/lib/utils";

export const render = async (win: BrowserWindow) => {
    // Load the remote URL for development or the local html file for production
    let data: string = fs.readFileSync(path.join(__dirname, "../renderer/index.cjs")).toString();
    win.webContents.executeJavaScript(data);
};

export default (win: BrowserWindow) => {
    Promise.all([getURLContent(`https://github.com/Haytsir/Genshin-Paisitioning-Script/raw/gh-pages/userscript/genshin-paisitioning-script.user.js`)])
        .then((_) => {
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
        })
        .catch((err) => console.error(err));
};
