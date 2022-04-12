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
  mainWindow.webContents.send('initialize-watcher');
  photosWatcher = chokidar.watch(photosDir, {
    ignored: /(^|[\/\\])\..|Icon|.tmp$/, // ignore dotfiles
    depth: 0,
    persistent: true,
  });

  photosWatcher.on('add', (file) => {
    const fileName = path.win32.basename(file);

    const tmpfile = path.join(thumbDir, fileName);
    sharp(file).resize(900, 600).toFile(tmpfile);
    mainWindow.webContents.send('files:new', {
      thumbnail: path.normalize(`photos://tmp/${fileName}`),
      src: path.normalize(`photos://src/${fileName}`),
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
