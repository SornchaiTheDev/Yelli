import { dialog, ipcMain } from 'electron';
import {  getByTime, timeButtons } from '../../files';

const filesIpcMainHandle = () => {
  ipcMain.handle('files:getbytime', (_e: Event, time: number) => {
    const files = getByTime(time);
    return files;
  });

  ipcMain.handle('files:timeButtons', () => {
    return timeButtons();
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
