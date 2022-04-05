import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { createTmpDir } from './files';

export const initialProcess = () => {
  const photosDir: string = path.join(app.getPath('documents'), 'photos');

  /* check photos folder exist */

  let isPhotosDirExist = fs
    .readdirSync(app.getPath('documents'))
    .find((file) => file === 'photos');

  if (!isPhotosDirExist) fs.mkdirSync(photosDir);

  let isPrintDirExist = fs
    .readdirSync(photosDir)
    .find((file) => file === 'print');

  let isThumbDirExist = fs
    .readdirSync(photosDir)
    .filter((file) => file.includes('thumb-')).length;

  if (!isPrintDirExist) fs.mkdirSync(path.join(photosDir, 'print'));
  if (!isThumbDirExist) createTmpDir();
};
