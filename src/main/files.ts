import fs from 'fs';
import path from 'path';

const createTmpDir = (photosDir: string) => {
  const thumbnailDir = fs.mkdirSync(path.join(photosDir, 'thumbnails'));
  return thumbnailDir;
};

const getFiles = (photosDir: string, thumbDir: string) => {
  const srcDir = fs
    .readdirSync(photosDir)
    .filter((file) => !['.DS_Store', 'Icon\r'].includes(file));
  const thumbnailDir = fs
    .readdirSync(thumbDir)
    .filter((file) => !['.DS_Store', 'Icon\r'].includes(file));
  const returnFiles = thumbnailDir.map((data, index) => {
    return {
      thumbnail: path.join('photos://tmp', data),
      src: path.join('photos://src', srcDir[index]),
      createdTime: fs.statSync(path.join(photosDir, srcDir[index])).ctime,
      stickers: [],
    };
  });

  return returnFiles;
};

const file = (file: string, photosDir: string, thumbDir: string) => {
  const type = file.slice(1, 4);
  const fileName = file.slice(5);
  if (type === 'tmp') return path.join(thumbDir, fileName);
  return path.join(photosDir, fileName);
};

const timeButtons = (photosDir: string) => {
  const isPhotosDirExist =
    fs
      .readdirSync(photosDir)
      .filter((file) => !['.DS_Store', 'Icon\r'].includes(file)).length > 2;

  if (!isPhotosDirExist) return 'no-photos';

  const files = fs.readdirSync(photosDir).filter((file) => {
    if (['.DS_Store', 'Icon\r'].includes(file)) return false;
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

const getByTime = (time: number, photosDir: string) => {
  const files = fs
    .readdirSync(photosDir)
    .filter((file) => !['.DS_Store', 'Icon\r'].includes(file))
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

export { getFiles, createTmpDir, file, getByTime, timeButtons };
