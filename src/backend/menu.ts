import { app, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { mainWindow } from "@/backend";
import { checkForUpdates as updaterCheckForUpdates } from "@/backend/updater";

export function toggleAlwaysOnTop() {
    if (!mainWindow) return;
    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop(), "screen-saver");
    mainWindow.webContents.executeJavaScript("window.$store.isAlwaysOnTop.toggle();");
}

export function checkforUpdates() {
    updaterCheckForUpdates();
}

export function minimizeWindow() {
    if (!mainWindow) return;
    mainWindow.minimize();
}

export function toggleMaximizeRestoreWindow() {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
}

export function openDevTools() {
    if (!mainWindow) return;
    mainWindow.webContents.openDevTools();
}

export function appQuit() {
    app.quit();
}

const template: (MenuItemConstructorOptions | MenuItem)[] = [];
template.push(
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Cmd+W" : "Alt+W",
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "View",
        role: "help",
        submenu: [
            {
                label: "Always on top",
                role: "help",
                accelerator: process.platform === "darwin" ? "Cmd+T" : "Alt+T",
                click: toggleAlwaysOnTop,
            },
            {
                label: "Toggle Underground Map",
                role: "help",
                accelerator: process.platform === "darwin" ? "Cmd+G" : "Alt+G",
                click: () => {
                    if (mainWindow) mainWindow.webContents.executeJavaScript("window.$store.isUndergroundMapActive.toggle();");
                },
            },
            {
                label: "Toggle Filter Pin",
                role: "help",
                accelerator: process.platform === "darwin" ? "Cmd+A" : "Alt+A",
                click: () => {
                    if (mainWindow) mainWindow.webContents.executeJavaScript("window.$store.isFilterPinActive.toggle();");
                },
            },
        ],
    },
    {
        label: "Help",
        role: "help",
        submenu: [
            {
                id: "check_update",
                label: "Check for updates",
                role: "help",
                click: checkforUpdates,
            },
        ],
    },
);

const menu = Menu.buildFromTemplate(template);

export { menu };
