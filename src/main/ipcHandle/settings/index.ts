import { app, ipcMain, BrowserWindow } from 'electron';
import Store from 'electron-store';
import { initialProcess } from '../../initialize';
import { removeThumbnailListener } from '../../thumbnails';
import path from 'path';

const settingsIpcHandler = (mainWindow: BrowserWindow) => {
  const store = new Store();
  let photosDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');
  let thumbDir: string = path.join(photosDir, 'thumbnails');

  ipcMain.handle(
    'setting:set',
    (_e: Event, arg: { key: string; value: string }) => {
      const { key, value } = arg;
      const store = new Store();
      store.set(key, value);
      if (['language', 'theme'].includes(key)) {
        mainWindow!.webContents.reload();
      }
      if (key === 'photosDir') {
        removeThumbnailListener();
        initialProcess(mainWindow!);
        photosDir = value;
        thumbDir = path.join(photosDir, 'thumbnails');
      }
    }
  );
  ipcMain.handle('setting:get', (_e: Event, key: string) => {
    const store = new Store();
    return store.get(key);
  });
};

export default settingsIpcHandler;
