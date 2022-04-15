import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { createThumbnail } from './thumbnails';
import Store from 'electron-store';

export const initialProcess = (mainWindow: BrowserWindow) => {
  const store = new Store();
  const uploadPath = app.isPackaged
    ? path.join(process.resourcesPath, 'assets', 'upload')
    : path.join(__dirname, '../../assets', 'upload');

  let photosDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');

  let isUploadDirExist = fs.existsSync(uploadPath);

  let isThumbDirExist = fs.existsSync(path.join(photosDir, 'thumbnails'));

  /* check photos folder exist */

  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir);
    store.set('photosDir', photosDir);
  }
  if (!isUploadDirExist) fs.mkdirSync(uploadPath);
  if (!isThumbDirExist) fs.mkdirSync(path.join(photosDir, 'thumbnails'));
  createThumbnail(mainWindow!, photosDir);
};
