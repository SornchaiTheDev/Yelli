import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';
let win: BrowserWindow | null;
const createPreferenceWindow = () => {
  if (!win) {
    win = new BrowserWindow({
      title: 'Yelli - Preferences',
      autoHideMenuBar: true,
      fullscreenable: false,
      resizable: false,
      width: 900,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    win.loadURL(resolveHtmlPath('index.html#/preference'));
  }
  if (!win.isFocused()) win.show();
  win.on('close', () => {
    win = null;
  });
};

ipcMain.handle('getPrinters', () => {
  return win?.webContents.getPrinters();
});

export default createPreferenceWindow;
