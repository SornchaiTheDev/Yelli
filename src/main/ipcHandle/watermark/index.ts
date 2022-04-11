import { app, ipcMain } from 'electron';
import path from 'path';
import fs, { mkdirSync } from 'fs';
import crypto from 'crypto';

const watermarkIpcHandler = () => {
  const watermarkPath = app.isPackaged
    ? path.join(process.resourcesPath, 'assets', 'watermark')
    : path.join(__dirname, '../../../../assets', 'watermark');

  ipcMain.handle('watermark:import', (_e: Event, watermarkSrc: string) => {
    if (!fs.existsSync(watermarkPath)) mkdirSync(watermarkPath);
    fs.readdirSync(watermarkPath).map((file) =>
      fs.unlinkSync(path.join(watermarkPath, file))
    );
    const ext = path.extname(watermarkSrc);
    const name =
      crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
    fs.copyFileSync(watermarkSrc, path.join(watermarkPath, name));
  });

  ipcMain.handle('watermark:get', () => {
    const sizeOf = require('image-size');
    if (
      fs.existsSync(watermarkPath) &&
      fs.readdirSync(watermarkPath).filter((file) => file !== '.DS_Store')
        .length > 0
    ) {
      const watermarkSrc = fs
        .readdirSync(watermarkPath)
        .filter((file) => file !== '.DS_Store')[0];
      const name = path.basename(watermarkSrc);

      return {
        src: `watermark://${name}`,
        size: sizeOf(path.join(watermarkPath, watermarkSrc)),
      };
    }
    return 'no-watermark';
  });

  ipcMain.handle('watermark:remove', (_e: Event, watermarkSrc: string) => {
    const watermarkName = watermarkSrc.split('://')[1];
    fs.unlinkSync(path.join(watermarkPath, watermarkName));
  });
};

export default watermarkIpcHandler;
