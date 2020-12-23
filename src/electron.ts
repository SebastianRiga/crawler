/**
* ##########################################
* # Imports
* ##########################################
*/

// Core
import * as path from 'path';

// Electron
import { app, BrowserWindow } from 'electron';

/**
* ##########################################
* # Properties / Objects
* ##########################################
*/

/**
 * Flag that indicates wether or not electron is running in development mode.
 *
 * @see app.isPackaged
 */
const isDev = !app.isPackaged;

/**
 * Main wrapper for web content to display it in an os native window.
 *
 * @see For a complete overview see {@link https://www.electronjs.org/docs/api/browser-window|BrowserWindow}.
 */
let browserWindow: BrowserWindow = null;

/**
 * Central configuration object for the electron BrowserWindow which
 * wraps the web content of the app.
 *
 * @see For a full list of options see
 * {@link https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions|BrowserWindowConstructorOptions}.
 */
// eslint-disable-next-line no-undef
const browserWindowConfig: Electron.BrowserWindowConstructorOptions = {
    width: 1024,
    height: 768,
    backgroundColor: '#000000',
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },
};

/**
* ##########################################
* # Live reloading
* ##########################################
*/

/**
 * Enables live reloading if electron is running in dev mode.
 * Current: Soft- & Hard-Resets.
 */
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '..', 'node_modules', 'electron'),
    });
}

/**
* ##########################################
* # Functions
* ##########################################
*/

/**
 * Creates the wrapping BrowserWindow with the browserWindowConfig
 * and opens the DevTools if the app is running in development mode.
 *
 * @see isDev
 * @see browserWindow
 * @see browserWindowConfig
 */
function createWindow(): void {
    browserWindow = new BrowserWindow(browserWindowConfig);

    const indexFile = isDev ? 'index.html' : 'index_dist.html';

    browserWindow.loadFile(path.join(__dirname, indexFile));

    if (isDev) {
        browserWindow.webContents.openDevTools();
    }

    browserWindow.on('closed', () => {
        browserWindow = null;
    });
}

/**
* ##########################################
* # Electron Callbacks
* ##########################################
*/

/**
 * Calls the createWindow function to initialize the wrapping
 * BrowserWindow when the app is ready.
 *
 * @see app
 * @see createWindow
 */
app.on('ready', createWindow);

/**
 * Exits the application when all windows are closed.
 *
 * @see app
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/**
 * Creates the BrowserWindow when an interaction is triggerd
 * and no BrowserWindow instance is available.
 *
 * @see createWindow
 */
app.on('activate', () => {
    if (browserWindow === null) {
        createWindow();
    }
});
