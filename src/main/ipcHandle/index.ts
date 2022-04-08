import Store from 'electron-store';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { getFiles, getByTime, timeButtons } from '../files';
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';
import crypto from 'crypto';
import { PhotoInterface } from 'renderer/pages/editor/interface';
import { initialProcess } from '../initialize';
import { removeThumbnailListener } from '../thumbnails';

const ipcHandle = (mainWindow: BrowserWindow) => {
  console.log('ipcHandle');
  const store = new Store();
  let photosDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');
  let thumbDir: string = path.join(photosDir, 'thumbnails');

  ipcMain.handle('files:listen', async () => {
    const files = await getFiles(photosDir, thumbDir);
    return files;
  });

  ipcMain.handle('files:getbytime', (_e: Event, time: number) => {
    const files = getByTime(time, photosDir);
    return files;
  });

  ipcMain.handle('files:timeButtons', () => {
    return timeButtons(photosDir);
  });

  ipcMain.handle('files:choose', () => {
    return dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    });
  });

  ipcMain.handle(
    'setting:set',
    (_e: Event, arg: { key: string; value: string }) => {
      const { key, value } = arg;
      const store = new Store();
      store.set(key, value);
      if (['language', 'theme'].includes(key)) {
        mainWindow!.webContents.reload();
      }
      if (key === 'photosDir') {
        removeThumbnailListener();
        initialProcess(mainWindow!);
        photosDir = value;
        thumbDir = path.join(photosDir, 'thumbnails');
      }
    }
  );
  ipcMain.handle('setting:get', (_e: Event, key: string) => {
    const store = new Store();
    return store.get(key);
  });

  ipcMain.handle('printing', (_e: Event, file: string) => {
    const irfanviewPath = 'C:\\Program Files (x86)\\IrfanView\\i_view64.exe';
    const printer = store.get('printer') as string;

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
};
export default ipcHandle;
