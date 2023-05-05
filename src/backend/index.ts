import { app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem, dialog } from "electron";
import path from "node:path";
import { render } from "@/backend/renderer";
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
            preload: path.join(__dirname, "../preload/index.cjs"),
        },
    });
    win.setMenuBarVisibility(false);

    // Load a remote URL
    win.loadURL("https://genshin.gamedot.org/?mid=genshinmaps")
        .then(() => render(win))
        .catch((err) => console.error(err));

    // --- Window 이벤트

    // Open the DevTools.
    win.webContents.openDevTools();

    win.webContents.setWindowOpenHandler(() => {
        return {
            action: "allow",
            overrideBrowserWindowOptions: {
                parent: win,
            },
        };
    });

    return win;
};

function start() {
    // --- App 세팅
    app.whenReady()
        .then(() => {
            mainWindow = createWindow();

            app.on("activate", () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    mainWindow = createWindow();
                }
            });
        })
        .catch((err) => console.error(err));

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("web-contents-created", (_, contents) => {
        contents.on("will-navigate", (event, navigationUrl) => {
            const parsedUrl = new URL(navigationUrl);

            const allowOrigins = ["https://members.gamedot.org/", "https://genshin.gamedot.org/", "https://nid.naver.com", "https://accounts.kakao.com"];
            if (!allowOrigins.includes(parsedUrl.origin)) {
                event.preventDefault();
            } else {
                console.log(`navigate is blocked. origin: ${parsedUrl.origin}`);
            }
        });
    });

    app.setUserTasks([]);

    // --- 단축키
    const menu = new Menu();
    menu.append(
        new MenuItem({
            label: "Toggle Underground Map",
            submenu: [
                {
                    role: "help",
                    accelerator: process.platform === "darwin" ? "Cmd+G" : "Alt+G",
                    click: () => {
                        if (mainWindow) mainWindow.webContents.executeJavaScript("globalThis.$store.isUndergroundMapActive.toggle();");
                    },
                },
            ],
        }),
    );
    menu.append(
        new MenuItem({
            label: "Toggle Filter Pin",
            submenu: [
                {
                    role: "help",
                    accelerator: process.platform === "darwin" ? "Cmd+A" : "Alt+A",
                    click: () => {
                        if (mainWindow) mainWindow.webContents.executeJavaScript("globalThis.$store.isFilterPinActive.toggle();");
                    },
                },
            ],
        }),
    );

    Menu.setApplicationMenu(menu);

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

try {
    start();
} catch (err) {
    dialog.showErrorBox("Application start error!", "An error occurred while running the application.");
}
