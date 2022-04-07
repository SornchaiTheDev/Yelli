import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { createTmpDir } from './files';
import { createThumbnail } from './thumbnails';
import Store from 'electron-store';

export const initialProcess = (mainWindow: BrowserWindow) => {
  const store = new Store();
  let photosDir: string = store.get('photosDir') as string;
  let thumbDir = path.join(photosDir, 'thumbnails');

  /* check photos folder exist */
  if (photosDir === undefined) {
    photosDir = path.join(app.getPath('documents'), 'photos');
    fs.mkdirSync(photosDir);
  }

  let isPrintDirExist = fs
    .readdirSync(photosDir)
    .find((file) => file === 'print');

  let isThumbDirExist = fs
    .readdirSync(photosDir)
    .filter((file) => file.includes('thumbnails')).length;

  if (!isPrintDirExist) fs.mkdirSync(path.join(photosDir, 'print'));
  if (!isThumbDirExist) createTmpDir(photosDir);
  createThumbnail(mainWindow!, photosDir, thumbDir);
};
