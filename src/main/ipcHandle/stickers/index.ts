import { app, ipcMain } from 'electron';
import fs, { mkdirSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

const stickerIpcHandler = () => {
  const stickerPath = app.isPackaged
    ? path.join(process.resourcesPath, 'assets', 'stickers')
    : path.join(__dirname, '../../../../assets', 'stickers');

  ipcMain.handle('sticker:import', (_e: Event, stickers: string[] | string) => {
    if (!fs.existsSync(stickerPath)) mkdirSync(stickerPath);
    let allStickers: string[] = [];

    if (typeof stickers === 'string') {
      allStickers = fs
        .readdirSync(stickers)
        .map((src) => path.join(stickers, src));
    } else {
      allStickers = stickers as string[];
    }

    const stickerSrc = allStickers
      .filter((file) => path.basename(file) !== '.DS_Store')
      .filter((file) => fs.statSync(file).isFile())
      .map((src: string) => {
        const ext = path.extname(src);
        const name =
          crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
        fs.copyFileSync(src, path.join(stickerPath, name));
        return `sticker://${name}` as string;
      });
    return stickerSrc;
  });

  ipcMain.handle('sticker:remove', (_e: Event, sticker: string) => {
    const stickerName = sticker.split('://')[1];
    fs.unlinkSync(path.join(stickerPath, stickerName));
  });

  ipcMain.handle('sticker:get', () => {
    if (!fs.existsSync(stickerPath)) mkdirSync(stickerPath);
    const stickers = fs
      .readdirSync(stickerPath)
      .filter((file) => file !== '.DS_Store')
      .map((file) => `sticker://${file}`);
    return stickers;
  });
};

export default stickerIpcHandler;
