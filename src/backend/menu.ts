import { app, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { mainWindow } from "@/backend";
import { checkForUpdates } from "@/backend/updater";

let alwaysOnTop = false;
const template: (MenuItemConstructorOptions | MenuItem)[] = [];
template.push(
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: "Command+Q",
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
                click: () => {
                    alwaysOnTop = !alwaysOnTop;
                    if (mainWindow) {
                        mainWindow.setAlwaysOnTop(alwaysOnTop, "screen-saver");
                        mainWindow.setMenuBarVisibility(!alwaysOnTop);
                    }
                },
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
                click: (menuItem, BrowserWindow, event) => {
                    checkForUpdates(menuItem, BrowserWindow, event);
                },
            },
            {
                label: "About",
                role: "about",
            },
        ],
    },
);

const menu = Menu.buildFromTemplate(template);

export { menu };
