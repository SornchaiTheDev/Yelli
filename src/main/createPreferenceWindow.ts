import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
let win: BrowserWindow;
const createPreferenceWindow = () => {
  win = new BrowserWindow({
    fullscreenable: false,
    resizable: false,
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadURL(`http://localhost:${1212}/index.html#/preference`);
};

ipcMain.handle('getPrinters', () => {
  return win?.webContents.getPrinters();
});

export default createPreferenceWindow;
