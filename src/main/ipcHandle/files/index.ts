import { app, dialog, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import Store from 'electron-store';

const store = new Store();

const filesIpcMainHandle = () => {
  ipcMain.handle('files:getbytime', (_e: Event, time: number) => {
    let photosDir: string =
      (store.get('photosDir') as string) ||
      path.join(app.getPath('documents'), 'photos');
    const files = fs
      .readdirSync(photosDir)
      .filter((file) => !/.DS_Store|Icon\\r|Icon|.tmp$/.test(file))
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
  });

  ipcMain.handle('files:timeButtons', () => {
    let photosDir: string =
      (store.get('photosDir') as string) ||
      path.join(app.getPath('documents'), 'photos');

    const isPhotosDirExist =
      fs
        .readdirSync(photosDir)
        .filter((file) => !/.DS_Store|Icon\\r|Icon|.tmp$/.test(file))
        .filter((file) => fs.statSync(path.join(photosDir, file)).isFile())
        .length > 0;

    if (!isPhotosDirExist) return 'no-photos';

    const files = fs.readdirSync(photosDir).filter((file) => {
      if (/.DS_Store|Icon\\r|Icon|.tmp$/.test(file)) return false;
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
  });

  ipcMain.handle(
    'files:choose',
    (
      _e: Event,
      type: 'dir' | 'file-single' | 'file-multiple'
    ): Promise<Electron.OpenDialogReturnValue> => {
      return dialog.showOpenDialog({
        properties:
          type === 'dir'
            ? ['openDirectory', 'createDirectory']
            : type === 'file-single'
            ? ['openFile']
            : ['openFile', 'multiSelections'],
        filters: [{ name: 'Images', extensions: ['png', 'jpg', 'JPG'] }],
      });
    }
  );
};

export default filesIpcMainHandle;
