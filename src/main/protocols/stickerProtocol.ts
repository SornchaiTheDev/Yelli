import { app, protocol } from 'electron';
import path from 'path';

const stickerProtocol = () => {
  protocol.registerFileProtocol('sticker', (request, callback) => {
    const sticker: string = request.url.replace(/sticker:\//, '');
    const StickerPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'stickers', sticker)
      : path.join(__dirname, '../../../assets', 'stickers', sticker);

    try {
      return callback(StickerPath);
    } catch (err) {
      return callback('err');
    }
  });
};

export default stickerProtocol;
