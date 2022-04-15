import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import Store from 'electron-store';

const store = new Store();
let photosDir: string =
  (store.get('photosDir') as string) ||
  path.join(app.getPath('documents'), 'photos');

const createTmpDir = () => {
  const thumbnailDir = fs.mkdirSync(path.join(photosDir, 'thumbnails'));
  return thumbnailDir;
};

const timeButtons = () => {
  const isPhotosDirExist =
    fs
      .readdirSync(photosDir)
      .filter((file) => !/.DS_Store|Icon\r'|.tmp$/.test(file)).length > 2;

  if (!isPhotosDirExist) return 'no-photos';

  const files = fs.readdirSync(photosDir).filter((file) => {
    if (!/.DS_Store|Icon\r'|.tmp$/.test(file)) return false;
    return fs.statSync(path.join(photosDir, file)).isFile();
  });

  const sorted = files.sort((a, b) => {
    const astat = fs.statSync(path.join(photosDir, a)).ctimeMs,
      bstat = fs.statSync(path.join(photosDir, b)).ctimeMs;
    return astat - bstat;
  });

  const first_ctime = fs
    .statSync(path.join(photosDir, sorted[0]))
    .ctime.getHours();
  let last_ctime = fs
    .statSync(path.join(photosDir, sorted[sorted.length - 1]))
    .ctime.getHours();
  /* when time over 23:59 (next day) */
  last_ctime = first_ctime > last_ctime ? 24 + last_ctime : last_ctime;
  return { first_ctime, last_ctime };
};

const getByTime = (time: number) => {
  const files = fs
    .readdirSync(photosDir)
    .filter((file) => !/.DS_Store|Icon\r'|.tmp$/.test(file))
    .filter((file) => fs.statSync(path.join(photosDir, file)).isFile())
    .filter((file) => {
      const file_timed = fs
        .statSync(path.join(photosDir, file))
        .ctime.getHours();
      return file_timed === time;
    })
    .map((file) => ({
      thumbnail: path.join('photos://tmp', file),
      src: path.join('photos://src', file),
      createdTime: fs.statSync(path.join(photosDir, file)).ctime,
      stickers: [],
    }));

  return files;
};

export { createTmpDir, getByTime, timeButtons };
