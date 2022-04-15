import admin, { storage } from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';
import { app } from 'electron';
import chokidar from 'chokidar';
import path from 'path';
import Store from 'electron-store';

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
});

let uploadWatcher: chokidar.FSWatcher;

const uploadImageToFirebase = () => {
  const store = new Store();

  const photoDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');

  const uploadDir = path.join(photoDir, 'print');
  uploadWatcher = chokidar.watch(uploadDir, {
    ignored: /(^|[\/\\])\..|Icon/, // ignore dotfiles
    depth: 0,
    ignoreInitial: true,
    persistent: true,
  });

  uploadWatcher.on('add', (file) => {
    const fileName = path.win32.basename(file);
    upload({ filePath: file, photoName: fileName });
  });

  const upload = async ({
    filePath,
    photoName,
  }: {
    filePath: string;
    photoName: string;
  }) => {
    const bucketName = 'yelli-bebb3.appspot.com';
    const dest = `upload/${photoName}`;
    const docId = photoName.split('.')[0];
    try {
      await admin
        .firestore()
        .collection('upload')
        .doc(docId)
        .set({ src: 'uploading' });

      await admin.storage().bucket(bucketName).upload(filePath, {
        destination: dest,
      });

      await storage().bucket(bucketName).file(dest).makePublic();

      admin
        .firestore()
        .collection('upload')
        .doc(docId)
        .set({ src: `https://storage.googleapis.com/${bucketName}/${dest}` });
    } catch (err) {
      throw err;
    }
  };
};

export default uploadImageToFirebase;

export const removeUploadListener = () => {
  uploadWatcher.close();
};
