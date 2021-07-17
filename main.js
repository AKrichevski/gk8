const {BrowserWindow, app, ipcMain, Notification} = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            // nodeIntegration: false,
            // worldSafeExecuteJavaScript: true,
            // contextIsolation: true,
            // preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notifiation', body: message}).show();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    app.quit();
});

app.whenReady().then(createWindow)