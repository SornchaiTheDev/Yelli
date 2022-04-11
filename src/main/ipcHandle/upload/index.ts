import { app, ipcMain } from 'electron';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { PhotoInterface } from 'renderer/utils/interface';

const uploadIpcHandler = () => {
  ipcMain.handle('uploading', (_e: Event, photo: PhotoInterface) => {
    const photoName = crypto
      .randomBytes(6)
      .toString('base64')
      .replace(/\//g, '-');
    const ext = photo.src.slice(-4);
    const uploadPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'upload')
      : path.join(__dirname, '../../../../assets', 'upload');
    const filePath = path.join(uploadPath, photoName + ext);

    fs.writeFileSync(
      filePath,
      photo.thumbnail!.replace(/^data:image\/png;base64,/, ''),
      'base64'
    );

    return { name: photoName, path: filePath };
  });
};

export default uploadIpcHandler;
