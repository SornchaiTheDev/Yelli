import { app, dialog, ipcMain } from 'electron';
import { getFiles, getByTime, timeButtons } from '../../files';
import Store from 'electron-store';
import path from 'path';

const filesIpcMainHandle = () => {
  const store = new Store();
  let photosDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');
  let thumbDir: string = path.join(photosDir, 'thumbnails');
  ipcMain.handle('files:listen', async () => {
    const files = await getFiles(photosDir, thumbDir);
    return files;
  });

  ipcMain.handle('files:getbytime', (_e: Event, time: number) => {
    const files = getByTime(time, photosDir);
    return files;
  });

  ipcMain.handle('files:timeButtons', () => {
    return timeButtons(photosDir);
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
