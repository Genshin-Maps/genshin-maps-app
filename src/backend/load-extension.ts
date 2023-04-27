import { BrowserWindow } from "electron";
import { get } from "lodash";
import { getURLContent } from "./lib/utils";

export default (win: BrowserWindow) => {
    const githubRepo = "https://github.com/juhyeon-cha/genshin-maps-extension";

    Promise.all([
        getURLContent(`${githubRepo}/raw/main/css/select-box.css`),
        getURLContent(`${githubRepo}/raw/main/css/extension.css`),
        getURLContent(`${githubRepo}/raw/main/js/select-box.js`),
        getURLContent(`${githubRepo}/raw/main/extension.js`),
        getURLContent(`${githubRepo}/raw/main/extension.js`),
        getURLContent(`https://github.com/Haytsir/Genshin-Paisitioning-Script/raw/gh-pages/userscript/genshin-paisitioning-script.user.js`),
    ]).then((results) => {
        const selectbox_css = get(results[0], "data", "");
        const extension_css = get(results[1], "data", "");
        const selectbox_js = get(results[2], "data", "");
        const extension_js = get(results[3], "data", "");
        const gps_js = get(results[4], "data", "");

        const globalJS = `
        function GM_getResourceText(resource_name) {
            if (resource_name == 'selectbox_css') {
                return \`${selectbox_css}\`;
            }
            else if (resource_name == 'extension_css') {
                return \`${extension_css}\`;
            }
        }
        function GM_addStyle(style_text) {
            const style = document.createElement('style');
            style.innerHTML = style_text;

            document.head.appendChild(style);
        }
        function GM_getValue() {
            // TODO: 
        }
        function GM_setValue() {
            // TODO: 
        }
        window.bridge.onTrack((event, info) => {
            console.debug(info);
        });
        // window.bridge.startTrack();
        `;
        win.webContents.executeJavaScript(globalJS);
        win.webContents.executeJavaScript(selectbox_js);
        win.webContents.executeJavaScript(extension_js);
        // TODO:
        // win.webContents.executeJavaScript(gps_js);
    });

    //
};
