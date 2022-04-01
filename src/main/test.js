const fs = require('fs');
const path = require('path');
let tmpDir = '/Users/imdev/Documents/photos/thumb-oHPa2u';
let photosDir = '/Users/imdev/Documents/photos';
const getByTime = (time) => {
  const files = fs
    .readdirSync(tmpDir)
    .filter((file) => file !== '.DS_Store')
    .filter((file) => {
      const file_timed = fs
        .statSync(path.join(photosDir, file))
        .ctime.getHours();
      console.log(file_timed);
      return file_timed === time;
    })
    .map((file) => ({
      thumbnail: path.join('photos://tmp', file),
      src: path.join('photos://src', file),
      createdTime: fs.statSync(path.join(photosDir, file)).ctimeMs,
      stickers: [],
    }));

  return files;
};

console.log(getByTime(20));
