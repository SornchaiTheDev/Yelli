import { BrowserWindow } from 'electron';
import chokidar from 'chokidar';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

let photosWatcher: chokidar.FSWatcher, thumbsWatcher: chokidar.FSWatcher;

const createThumbnail = (
  mainWindow: BrowserWindow,
  photosDir: string,
  thumbDir: string
) => {
  photosWatcher = chokidar.watch(photosDir, {
    ignored: /(^|[\/\\])\..|Icon/, // ignore dotfiles
    depth: 0,
    persistent: true,
  });

  photosWatcher.on('add', (file) => {
    const re = new RegExp(photosDir + '/', 'g');
    const fileName = file.replace(re, '');
    const tmpfile = path.join(thumbDir, fileName);
    sharp(file).resize(900, 600).toFile(tmpfile);
  });

  thumbsWatcher = chokidar.watch(thumbDir, {
    ignored: /(^|[\/\\])\..|Icon/, // ignore dotfiles
    depth: 0,
    persistent: true,
  });

  thumbsWatcher.on('add', (file) => {
    const re = new RegExp(thumbDir + '/', 'g');
    const fileName = file.replace(re, '');

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
  thumbsWatcher.close();
};

export { createThumbnail, removeThumbnailListener };
