import { ipcMain } from 'electron';
import os from 'os';
import { exec } from 'child_process';
import Store from 'electron-store';

const printIpcHandler = () => {
  const store = new Store();
  ipcMain.handle('printing', (_e: Event, file: string) => {
    const irfanviewPath = 'C:\\Program Files\\IrfanView\\i_view64.exe';
    const printer = store.get('printer') as string;
    switch (os.platform()) {
      case 'linux':
      case 'darwin':
        exec(`lpr ${file} -P ${printer}`);
        break;
      case 'win32':
        console.log(`"${irfanviewPath}" "${file}" /print=${printer}`);
        exec(`"${irfanviewPath}" "${file}" /print=${printer}`);
        break;
    }
  });
};

export default printIpcHandler;
