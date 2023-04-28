import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import { is } from "@electron-toolkit/utils";
import path from "path";
import { default as loadExtension } from "@/backend/load-extension";
import { getAppInfoHandler, getConfigHandler, setConfigHandler, startTrackHandler, stopTrackHandler } from "@/backend/handlers";

// ---
export let mainWindow: BrowserWindow | null = null;
const createWindow = (): BrowserWindow => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload/index.js"),
        },
    });
    win.setMenuBarVisibility(false);

    // Load a remote URL
    win.loadURL("https://genshin.gamedot.org/?mid=genshinmaps").then(() => {
        loadExtension(win);

        // loadAutotrack();
    });

    // --- Window 이벤트

    if (is.dev) {
        // Open the DevTools.
        win.webContents.openDevTools();
    }

    return win;
};

async function start() {
    // --- App 세팅
    app.whenReady().then(() => {
        mainWindow = createWindow();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                mainWindow = createWindow();
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

    // --- App Info
    ipcMain.handle("get-app-info", getAppInfoHandler);

    // --- Config
    ipcMain.handle("get-config", getConfigHandler);
    ipcMain.handle("set-config", setConfigHandler);

    // --- TODO: App Update

    // --- Autotrack
    ipcMain.handle("start-track", startTrackHandler);
    ipcMain.handle("stop-track", stopTrackHandler);
}

start();
