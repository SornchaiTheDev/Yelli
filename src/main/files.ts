import fs from 'fs';
import path from 'path';

const getFiles = (directory: string) => {
  const dir = fs.readdirSync(directory);
  const returnFiles = dir
    .filter((file) => file !== '.DS_Store')
    .map((data) => ({
      src: path.join('./mock_photo', data),
      stickers: [],
    }));

  console.log(returnFiles);
  return returnFiles;
};

export { getFiles };
