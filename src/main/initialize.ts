import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { createTmpDir } from './files';
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

  let isThumbDirExist = fs
    .readdirSync(path.join(photosDir, 'thumbnails'))
    .filter((file) => file.includes('thumbnails')).length;

  /* check photos folder exist */

  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir);
    store.set('photosDir', photosDir);
  }
  if (!isUploadDirExist) fs.mkdirSync(uploadPath);
  if (!isThumbDirExist) createTmpDir();
  createThumbnail(mainWindow!, photosDir);
};
