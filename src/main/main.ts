/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, protocol, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import ipcHandle from './ipcHandle';
import Store from 'electron-store';
import { initialProcess } from './initialize';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1270,
    height: 720,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('initialize', () => {
  initialProcess(mainWindow!);
  return 'initialize-success';
});

app
  .whenReady()
  .then(async () => {
    await createWindow();
    ipcHandle(mainWindow!);
    // const store = new Store();
    // store.clear();

    protocol.registerFileProtocol('photos', (request, callback) => {
      const photoPath = request.url.replace(/photos:\//, '');
      const store = new Store();

      const photosDir: string =
        (store.get('photosDir') as string) ||
        path.join(app.getPath('documents'), 'photos');
      const thumbDir: string = path.join(photosDir, 'thumbnails');

      const file = (file: string, photosDir: string, thumbDir: string) => {
        const type = file.slice(0, 3);
        const fileName = file.slice(4);

        if (type === 'tmp') return path.join(thumbDir, fileName);
        return path.join(photosDir, fileName);
      };

      try {
        return callback(file(photoPath, photosDir, thumbDir));
      } catch (err) {
        return callback('err');
      }
    });

    protocol.registerFileProtocol('sticker', (request, callback) => {
      const sticker = request.url.replace(/sticker:\//, '');
      const StickerPath = app.isPackaged
        ? path.join(process.resourcesPath, 'assets', 'stickers', sticker)
        : path.join(__dirname, '../../assets', 'stickers', sticker);

      try {
        return callback(StickerPath);
      } catch (err) {
        return callback('err');
      }
    });

    protocol.registerFileProtocol('banner', (request, callback) => {
      const banner = request.url.replace(/banner:\//, '');

      const BannerPath = app.isPackaged
        ? path.join(process.resourcesPath, 'assets', 'banner', banner)
        : path.join(__dirname, '../../assets', 'banner', banner);

      try {
        return callback(BannerPath);
      } catch (err) {
        return callback('err');
      }
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.

      if (mainWindow === null) {
        createWindow();
      }
    });
  })
  .catch(console.log);
