const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const axios = require('axios');
const { get } = require('lodash');

// ---
const getURLContent = (url) => {
    return axios.get(url);
};

const addExtension = (win) => {
    const githubRepo = 'https://github.com/juhyeon-cha/genshin-maps-extension';

    Promise.all([
        getURLContent(`${githubRepo}/raw/main/css/select-box.css`),
        getURLContent(`${githubRepo}/raw/main/css/extension.css`),
        getURLContent(`${githubRepo}/raw/main/js/select-box.js`),
        getURLContent(`${githubRepo}/raw/main/extension.js`)

    ]).then(results => {
        const selectbox_css = get(results[0], 'data', '');
        const extension_css = get(results[1], 'data', '');
        const selectbox_js = get(results[2], 'data', '');
        const extension_js = get(results[3], 'data', '');

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
        `;
        win.webContents.executeJavaScript(globalJS);
        win.webContents.executeJavaScript(selectbox_js);
        win.webContents.executeJavaScript(extension_js);
    });
};

const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.setMenuBarVisibility(false);

    // Load a remote URL
    win.loadURL('https://genshin.gamedot.org/?mid=genshinmaps')
        .then(() => {
            addExtension(win);
        });

    // --- Window 이벤트

    // Open the DevTools.
    win.webContents.openDevTools();
};

// --- 다크 모드

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light';
    } else {
        nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
});

// --- App 세팅

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.setUserTasks([]);
