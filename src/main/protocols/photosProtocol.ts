import { app, protocol } from 'electron';
import path from 'path';
import Store from 'electron-store';
const photosProtocol = () => {
  protocol.registerFileProtocol('photos', (request, callback) => {
    const photoPath = request.url.replace(/photos:\//, '');
    const store = new Store();

    const photosDir: string =
      (store.get('photosDir') as string) ||
      path.join(app.getPath('documents'), 'photos');
    const thumbDir: string = path.join(photosDir, 'thumbnails');

    const file = (file: string, photosDir: string, thumbDir: string) => {
      const type = file.slice(0, 3);
      const fileName = file.slice(4);

      if (type === 'tmp') return path.join(thumbDir, fileName);
      return path.join(photosDir, fileName);
    };

    try {
      return callback(file(photoPath, photosDir, thumbDir));
    } catch (err) {
      return callback('err');
    }
  });
};

export default photosProtocol;
