import { app, protocol } from 'electron';
import path from 'path';

const assetsProtocol = () => {
  protocol.registerFileProtocol('assets', (request, callback) => {
    const asset: string = request.url.replace(/assets:\//, '');

    const AssetsPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', asset)
      : path.join(__dirname, '../../../assets', asset);

    try {
      return callback(AssetsPath);
    } catch (err) {
      return callback('err');
    }
  });
};
export default assetsProtocol;
