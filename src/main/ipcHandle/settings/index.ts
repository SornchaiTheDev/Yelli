import { ipcMain, BrowserWindow } from 'electron';
import Store from 'electron-store';
import { initialProcess } from '../../initialize';
import removeListener from '../removeListener';

const settingsIpcHandler = (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    'setting:set',
    (_e: Event, arg: { key: string; value: string }) => {
      const { key, value } = arg;
      const store = new Store();
      store.set(key, value);
      if (['language', 'theme'].includes(key)) {
        return mainWindow!.webContents.reload();
      }
      if (key === 'photosDir') {
        removeListener();
        initialProcess(mainWindow!);
      }
    }
  );
  ipcMain.handle('setting:get', (_e: Event, key: string) => {
    const store = new Store();
    return store.get(key);
  });
};

export default settingsIpcHandler;
