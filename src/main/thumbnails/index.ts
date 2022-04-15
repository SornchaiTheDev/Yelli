import { BrowserWindow } from 'electron';
import chokidar from 'chokidar';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

let photosWatcher: chokidar.FSWatcher;

const createThumbnail = (mainWindow: BrowserWindow, photosDir: string) => {
  const thumbDir = path.join(photosDir, 'thumbnails');
  mainWindow.webContents.send('initialize-watcher');
  photosWatcher = chokidar.watch(photosDir, {
    ignored: /(^|[\/\\])\..|Icon/, // ignore dotfiles
    ignoreInitial: true,
    depth: 0,
    persistent: true,
  });

  photosWatcher.on('add', (file) => {
    const re = new RegExp(photosDir + '/', 'g');
    const fileName = file.replace(re, '');
    const tmpfile = path.join(thumbDir, fileName);
    sharp(file).resize(900, 600).toFile(tmpfile);

    mainWindow.webContents.send('files:new', {
      thumbnail: path.join('photos://tmp', fileName),
      src: path.join('photos://src', fileName),
      createdTime: fs.statSync(path.join(photosDir, fileName)).ctime,
      stickers: [],
    });
  });
};

const removeThumbnailListener = () => {
  photosWatcher.close();
};

export { createThumbnail, removeThumbnailListener };
