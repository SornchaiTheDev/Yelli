import admin, { storage } from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';
import { app } from 'electron';
import chokidar from 'chokidar';
import path from 'path';
import { unlinkSync } from 'fs';

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

const uploadImageToFirebase = () => {
  const uploadDir = app.isPackaged
    ? path.join(process.resourcesPath, 'assets', 'upload')
    : path.join(__dirname, '../../../../assets', 'upload');

  const uploadWatcher = chokidar.watch(uploadDir, {
    ignored: /(^|[\/\\])\..|Icon/, // ignore dotfiles
    depth: 0,
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
      console.log('upload called');
      await admin
        .firestore()
        .collection('upload')
        .doc(docId)
        .set({ src: 'uploading' });

      await admin.storage().bucket(bucketName).upload(filePath, {
        destination: dest,
      });

      unlinkSync(filePath);

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
