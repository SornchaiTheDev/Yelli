import fs from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import chokidar from 'chokidar';
import sharp from 'sharp';

const photosDir: string = path.join(app.getPath('documents'), 'photos');
let tmpDir: string;

const isHasTmpDir = () => {
  const directory = fs.readdirSync(photosDir);

  const condition = directory.map((file) => {
    const stat = fs.lstatSync(path.join(photosDir, file));
    if (stat.isDirectory()) tmpDir = path.join(photosDir, file);
    return stat.isDirectory();
  });

  return condition.some((file) => file === true);
};

const createTmpDir = async () => {
  if (isHasTmpDir()) return;

  if (!fs.existsSync(photosDir)) await fs.mkdirSync(photosDir);
  const thumbnailDir = await fs.mkdtempSync(path.join(photosDir, 'thumb-'));
  tmpDir = thumbnailDir;
  return thumbnailDir;
};

const createThumbnail = (mainWindow: BrowserWindow) => {
  const watcher = chokidar.watch(photosDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    depth: 0,
    persistent: true,
  });
  watcher.on('add', (file) => {
    const re = new RegExp(photosDir + '/', 'g');
    const fileName = file.replace(re, '');
    sharp(file).resize(900, 600).toFile(`${tmpDir}/${fileName}`);
  });
};

const getFiles = () => {
  const isDirExist = fs.existsSync(tmpDir);
  if (isDirExist) {
    const srcDir = fs
      .readdirSync(photosDir)
      .filter((file) => file !== '.DS_Store');
    const thumbnailDir = fs
      .readdirSync(tmpDir)
      .filter((file) => file !== '.DS_Store');

    const returnFiles = thumbnailDir.map((data, index) => ({
      thumbnail: path.join('photos://tmp', data),
      src: path.join('photos://src', srcDir[index]),
      stickers: [],
    }));

    return returnFiles;
  }
  return null;
};

const file = (file: string) => {
  const type = file.slice(1, 4);
  const fileName = file.slice(5);
  if (type === 'tmp') return path.join(tmpDir, fileName);
  return path.join(photosDir, fileName);
};

export { getFiles, createTmpDir, createThumbnail, file };
