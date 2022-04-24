import { app, protocol } from 'electron';
import path from 'path';
import Store from 'electron-store';
const photosProtocol = () => {
  protocol.registerFileProtocol('photos', (request, callback) => {
    const store = new Store();

    const photosDir: string =
      (store.get('photosDir') as string) ||
      path.join(app.getPath('documents'), 'photos');
    const thumbDir: string = path.join(photosDir, 'thumbnails');

    const type = request.url.slice(9, 12);
    const fileName = path.basename(request.url);
    let resolve;

    if (type === 'tmp') {
      resolve = path.join(thumbDir, fileName);
    } else {
      resolve = path.join(photosDir, fileName);
    }

    try {
      return callback(resolve);
    } catch (err) {
      return callback('err');
    }
  });
};

export default photosProtocol;
