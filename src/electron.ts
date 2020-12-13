/// Core
import * as path from 'path';

/// Electron
import { app, BrowserWindow } from 'electron';

if (process.env.ELECTRON_DEBUG === 'true' || process.env.ELECTRON_DEBUG === 'vscode') {
    require('electron-reload')(__dirname);
}

/**
 * 
 */
let browserWindow: BrowserWindow = null;

const config: Electron.BrowserWindowConstructorOptions = {
    width: 1024,
    height: 768,
    webPreferences: {
        nodeIntegration: true
    }
};

function createWindow(): void {
    browserWindow = new BrowserWindow(config);

    browserWindow.loadFile(path.join(__dirname, "index.html"));

    if (process.env.ELECTRON_DEBUG === 'true') {
        browserWindow.webContents.openDevTools();
    }

    browserWindow.on('closed', () => {
        browserWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (browserWindow === null) {
        createWindow();
    }
});