import { app, protocol } from 'electron';
import path from 'path';
const watermarkProtocol = () => {
  protocol.registerFileProtocol('watermark', (request, callback) => {
    const watermark: string = request.url.replace(/watermark:\//, '');

    const watermarkPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'watermark', watermark)
      : path.join(__dirname, '../../../assets', 'watermark', watermark);

    try {
      return callback(watermarkPath);
    } catch (err) {
      return callback('err');
    }
  });
};

export default watermarkProtocol;
