import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import { default as loadExtension } from "./app/load-extension";
import { default as loadAutotrack } from "./app/load-autotrack";

// ---
const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.setMenuBarVisibility(false);

    // Load a remote URL
    win.loadURL("https://genshin.gamedot.org/?mid=genshinmaps").then(() => {
        loadExtension(win);
        loadAutotrack();

        // Open the DevTools.
        win.webContents.openDevTools();
    });
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
