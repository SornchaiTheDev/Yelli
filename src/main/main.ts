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
import { app, BrowserWindow, ipcMain, shell, protocol, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  getFiles,
  createTmpDir,
  createThumbnail,
  file,
  getByTime,
  timeButtons,
} from './files';
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';
import crypto from 'crypto';
import { PhotoInterface } from 'renderer/pages/editor/interface';
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
  // require('electron-debug')();
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
    width: 900,
    height: 600,
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

ipcMain.handle('files:listen', async () => {
  const files = await getFiles();
  return files;
});

ipcMain.handle('files:getbytime', (_e: Event, time: number) => {
  const files = getByTime(time);

  return files;
});

ipcMain.handle('files:timeButtons', () => {
  return timeButtons();
});

ipcMain.handle('initialize', () => {
  initialProcess();
  return 'initialize-success';
});

ipcMain.handle('getPrinters', async () => {
  return mainWindow?.webContents.getPrinters();
});
ipcMain.handle('files:choose', () => {
  return dialog.showOpenDialog({ properties: ['openDirectory'] });
});

app
  .whenReady()
  .then(async () => {
    await createWindow();

    createThumbnail(mainWindow!);

    protocol.registerFileProtocol('photos', (request, callback) => {
      const path = request.url.replace(/photos:/, '');

      try {
        return callback(file(path));
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

    ipcMain.handle('printing', (_e: Event, file: string) => {
      const irfanviewPath = 'C:\\Program Files (x86)\\IrfanView\\i_view64.exe';
      const printer = 'Dai_Nippon_Printing_DS_RX1_3';
      switch (os.platform()) {
        case 'linux':
        case 'darwin':
          exec(`lpr ${file} -P ${printer}`);
          break;
        case 'win32':
          exec(`${irfanviewPath} ${file} /print=${printer}`);
          break;
      }
    });

    ipcMain.handle('uploading', (_e: Event, photo: PhotoInterface) => {
      const photosDir: string = path.join(app.getPath('documents'), 'photos');
      const photoName = crypto
        .randomBytes(6)
        .toString('base64')
        .replace(/\//g, '-');
      const ext = photo.src.slice(-4);
      const filePath = path.join(photosDir, 'print', photoName + ext);

      fs.writeFileSync(
        filePath,
        photo.thumbnail!.replace(/^data:image\/png;base64,/, ''),
        'base64'
      );

      return { name: photoName, path: filePath };
    });
  })
  .catch(console.log);
