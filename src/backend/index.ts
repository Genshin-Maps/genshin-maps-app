import path from "node:path";
import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import { menu } from "@/backend/menu";
import { render } from "@/backend/renderer";
import { setHandlers } from "@/backend/handlers";

// --- Deep link
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("genshin-maps-app", process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient("genshin-maps-app");
}

// ---
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

    setHandlers();
}

try {
    start();
} catch (err) {
    dialog.showErrorBox("Application start error!", "An error occurred while running the application.");
}
