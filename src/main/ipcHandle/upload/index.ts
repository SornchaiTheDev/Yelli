import { app, ipcMain } from 'electron';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { PhotoInterface } from 'renderer/utils/interface';
import admin, { storage } from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';

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

const uploadToFirebase = async ({
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

const uploadIpcHandler = async () => {
  ipcMain.handle('uploading', (_e: Event, photo: PhotoInterface) => {
    const ext = photo.src.slice(-4);
    const photoName =
      crypto.randomBytes(6).toString('base64').replace(/\//g, '-') + ext;
    const uploadPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'upload')
      : path.join(__dirname, '../../../../assets', 'upload');
    const filePath = path.join(uploadPath, photoName);

    fs.writeFileSync(
      filePath,
      photo.thumbnail!.replace(/^data:image\/png;base64,/, ''),
      'base64'
    );
    uploadToFirebase({ filePath, photoName });

    return { name: photoName, path: filePath };
  });
};

export default uploadIpcHandler;
