import admin, { storage } from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';
import { app } from 'electron';
import chokidar from 'chokidar';
import path from 'path';
import Store from 'electron-store';
import { v4 as uuid } from 'uuid';
import { EventI } from '@decor/Event';

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
    ignored: /(^|[\/\\])\..|Icon|.tmp$/, // ignore dotfiles
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
    const docId = uuid();
    const event = (await store.get('event')) as EventI;

    try {
      await admin
        .firestore()
        .collection('events')
        .doc(event.id)
        .collection('photos')
        .doc(docId)
        .set({ src: 'uploading' });

      await admin.storage().bucket(bucketName).upload(filePath, {
        destination: dest,
      });

      await storage().bucket(bucketName).file(dest).makePublic();

      await admin
        .firestore()
        .collection('events')
        .doc(event.id)
        .update({ amount: admin.firestore.FieldValue.increment(1) });

      admin
        .firestore()
        .collection('events')
        .doc(event.id)
        .collection('photos')
        .doc(docId)
        .set({
          src: `https://storage.googleapis.com/${bucketName}/${dest}`,
          created_at: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
      throw err;
    }
  };
};

export default uploadImageToFirebase;

export const removeUploadListener = () => {
  uploadWatcher.close();
};
