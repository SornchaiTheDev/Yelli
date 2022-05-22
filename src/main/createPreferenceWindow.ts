import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';
let win: BrowserWindow | null;
const createPreferenceWindow = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  if (!win) {
    win = new BrowserWindow({
      title: 'Yelli - Preferences',
      autoHideMenuBar: true,
      fullscreenable: false,
      minWidth: 900,
      minHeight: 600,
      icon: getAssetPath('icon.png'),

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
