import { BrowserWindow } from "electron";
import fs from "fs";
import path from "path";

export const render = async (win: BrowserWindow) => {
    // executeJavaScript의 실행 결과로 활용되는 것을 막기 위해 스크립트 끝에 ";0" 추가
    // https://github.com/electron/electron/issues/23722
    let data: string = fs.readFileSync(path.join(__dirname, "../renderer/index.cjs")).toString();
    win.webContents.executeJavaScript(data + ";0").catch((err) => console.log(err));
    // win.webContents.executeJavaScript("window.bridge.startTrack();");
};
