import { app, ipcMain } from 'electron';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { PhotoInterface } from 'renderer/utils/interface';

const uploadIpcHandler = () => {
  ipcMain.handle('uploading', (_e: Event, photo: PhotoInterface) => {
    const ext = path.extname(photo.src);
    const photoName =
      crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
    const uploadPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'upload')
      : path.join(__dirname, '../../../../assets', 'upload');
    const filePath = path.join(uploadPath, photoName);

    fs.writeFileSync(
      filePath,
      photo.thumbnail!.replace(/^data:image\/png;base64,/, ''),
      'base64'
    );

    return { name: photoName, path: filePath };
  });
};

export default uploadIpcHandler;
