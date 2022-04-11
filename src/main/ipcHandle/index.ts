import { BrowserWindow } from 'electron';
import stickerIpcHandler from './stickers';
import watermarkIpcHandler from './watermark';
import filesIpcMainHandler from './files';
import settingsIpcHandler from './settings';
import uploadIpcHandler from './upload';
import printIpcHandler from './print';

const ipcHandle = (mainWindow: BrowserWindow) => {
  stickerIpcHandler();

  watermarkIpcHandler();

  filesIpcMainHandler();

  settingsIpcHandler(mainWindow!);

  uploadIpcHandler();

  printIpcHandler();
};
export default ipcHandle;
