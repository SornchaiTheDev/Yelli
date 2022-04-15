import { app, ipcMain } from 'electron';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { PhotoInterface } from 'renderer/utils/interface';
import Store from 'electron-store';

const uploadIpcHandler = () => {
  const store = new Store();
  ipcMain.handle('uploading', (_e: Event, photo: PhotoInterface) => {
    const ext = path.extname(photo.src);
    const photoName =
      crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
    const photoDir: string =
      (store.get('photosDir') as string) ||
      path.join(app.getPath('documents'), 'photos');

    const filePath = path.join(photoDir, 'print', photoName);
    fs.writeFileSync(
      filePath,
      photo.thumbnail!.replace(/^data:image\/png;base64,/, ''),
      'base64'
    );

    return { name: photoName, path: filePath };
  });
};

export default uploadIpcHandler;
