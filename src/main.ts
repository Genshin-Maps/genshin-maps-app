import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import { default as loadExtension } from "./load-extension";
import { default as loadAutotrack } from "./load-autotrack";
import { GetCompileVersion } from "./vendor/cvat";

const AppInfo: AppInfo = {
    appVersion: app.getVersion(),
    libVersion: GetCompileVersion(),
}
// ---
const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + "/preload.js",
        }
    });
    win.setMenuBarVisibility(false);

    // Load a remote URL
    win.loadURL("https://genshin.gamedot.org/?mid=genshinmaps").then(() => {
        loadExtension(win);
        setInterval(() => {
            win.webContents.send('cvatInfo', { version: GetCompileVersion() });
        }, 5000);
        
        // loadAutotrack();
    });

    // --- Window 이벤트

    // Open the DevTools.
    win.webContents.openDevTools();
};

async function start() {
    // --- App 세팅

    app.whenReady().then(() => {
        createWindow();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.setUserTasks([]);

    // --- 다크 모드

    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = "light";
        } else {
            nativeTheme.themeSource = "dark";
        }
        return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });
}

start();
