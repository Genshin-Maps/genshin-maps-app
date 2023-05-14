import path from "node:path";
import fs from "node:fs";
import { app, BrowserWindow, Menu, dialog, shell } from "electron";
import logger from "electron-log";
import { menu } from "@/backend/menu";
import { render } from "@/backend/renderer";
import { setHandlers } from "@/backend/handlers";
import { set } from "ref-napi";

const allowOrigins = ["https://members.gamedot.org", "https://genshin.gamedot.org", "https://nid.naver.com", "https://accounts.kakao.com"];
function isSafeForExternalOpen(url: string) {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "https:" && allowOrigins.includes(parsedUrl.origin);
}

// --- Deep link
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("genshin-maps-app", process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient("genshin-maps-app");
}

// ---
const loadWindow = (win: BrowserWindow): void => {
    win.loadURL("https://genshin.gamedot.org/?mid=genshinmaps")
        .then(() => render(win))
        .catch((err) => logger.error(err));
};

export let mainWindow: BrowserWindow | null = null;
const createWindow = (): BrowserWindow => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "../preload/index.cjs"),
        },
    });

    // Load a remote URL
    loadWindow(win);

    // --- Window 이벤트

    // Open the DevTools.
    if (import.meta.env?.MODE === "development") {
        win.webContents.openDevTools();
        (async () => {
            const rendererFilePath = path.join(__dirname, "../renderer/index.cjs");
            logger.log(`watching: ${rendererFilePath}`);
            const watcher = fs.watch(rendererFilePath);

            let fsWait = false;
            watcher.on("change", () => {
                setImmediate(() => {
                    if (fsWait) return;
                    fsWait = true;
                    logger.log("reloading the window");
                    loadWindow(win);
                    setTimeout(() => {
                        fsWait = false;
                    }, 1000);
                });
            });
        })();
    }

    win.webContents.setWindowOpenHandler(({ url }) => {
        if (isSafeForExternalOpen(url)) {
            setImmediate(() => {
                shell.openExternal(url);
            });
        }
        return { action: "deny" };
    });

    return win;
};

function start() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
        app.quit();
        return;
    }

    app.on("second-instance", (_event, commandLine, _workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
        const cmd = ((commandLine || []).pop() || "").slice(0, -1);
        dialog.showErrorBox("Welcome Back", `You arrived from: ${cmd}`);
    });

    app.on("open-url", (_event, url) => {
        dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
    });
    // --- App 세팅
    app.whenReady()
        .then(() => {
            mainWindow = createWindow();

            // --- 메뉴
            Menu.setApplicationMenu(menu);

            app.on("activate", () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    mainWindow = createWindow();
                }
            });

            return setHandlers();
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
            if (!isSafeForExternalOpen(navigationUrl)) {
                event.preventDefault();
            } else {
                console.log(`navigate is blocked. origin: ${parsedUrl.origin}`);
            }
        });
    });

    app.setUserTasks([]);
}

try {
    start();
} catch (err) {
    dialog.showErrorBox("Application start error!", "An error occurred while running the application.");
}
