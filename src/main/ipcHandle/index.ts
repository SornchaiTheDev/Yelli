import Store from 'electron-store';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { getFiles, getByTime, timeButtons } from '../files';
import fs, { mkdirSync } from 'fs';
import os from 'os';
import { exec } from 'child_process';
import crypto from 'crypto';
import { PhotoInterface } from 'renderer/utils/interface/index';
import { initialProcess } from '../initialize';
import { removeThumbnailListener } from '../thumbnails';

const ipcHandle = (mainWindow: BrowserWindow) => {
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

  ipcMain.handle('files:choose', (_e: Event, type: 'dir' | 'file') => {
    return dialog.showOpenDialog({
      properties:
        type === 'dir'
          ? ['openDirectory', 'createDirectory']
          : ['openFile', 'multiSelections'],
    });
  });

  ipcMain.handle('sticker:importDir', (_e: Event, dir: string) => {
    const appPath = app.getAppPath();
    const stickerPath = path.join(appPath, 'stickers');
    if (!fs.existsSync(stickerPath)) mkdirSync(stickerPath);
    const stickersInDir = fs.readdirSync(dir);
    const stickers = stickersInDir
      .filter((file) => file !== '.DS_Store')
      .filter((file) => fs.statSync(path.join(dir, file)).isFile())
      .map((file) => path.join(dir, file));
    const stickerSrc = stickers.map((src: string) => {
      const ext = path.extname(src);
      const name =
        crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
      fs.copyFileSync(src, path.join(stickerPath, name));
      return { src: `sticker://${name}` };
    });
    return stickerSrc;
  });

  ipcMain.handle('sticker:import', (_e: Event, stickers: string[]) => {
    const appPath = app.getAppPath();
    const stickerPath = path.join(appPath, 'stickers');
    if (!fs.existsSync(stickerPath)) mkdirSync(stickerPath);
    const stickerSrc = stickers.map((src: string) => {
      const ext = path.extname(src);
      const name =
        crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
      fs.copyFileSync(src, path.join(stickerPath, name));
      return { src: `sticker://${name}` };
    });
    return stickerSrc;
  });

  ipcMain.handle('sticker:remove', (_e: Event, sticker: string) => {
    const appPath = app.getAppPath();
    const stickerPath = path.join(appPath, 'stickers');
    const stickerName = sticker.split('://')[1];
    fs.unlinkSync(path.join(stickerPath, stickerName));
  });

  ipcMain.handle('sticker:get', () => {
    const appPath = app.getAppPath();
    const stickerPath = path.join(appPath, 'stickers');
    if (!fs.existsSync(stickerPath)) mkdirSync(stickerPath);
    const stickers = fs
      .readdirSync(stickerPath)
      .filter((file) => file !== '.DS_Store')
      .map((file) => ({
        src: `sticker://${file}`,
      }));
    return stickers;
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
