import admin from 'firebase-admin';
import { ipcMain } from 'electron';

const deleteEvent = () => {
  ipcMain.handle('delete_event', async (_event: Event, eventId: string) => {
    try {
      const photosFetch = await admin
        .firestore()
        .collection('events')
        .doc(eventId)
        .collection('photos')
        .get();
      const photos: { src: string; id: string }[] = [];
      photosFetch.forEach((photo) =>
        photos.push({ ...(photo.data() as { src: string }), id: photo.id })
      );
      for await (let photo of photos) {
        await admin
          .firestore()
          .collection('events')
          .doc(eventId)
          .collection('photos')
          .doc(photo.id)
          .delete();
        const photoRef = photo.src.replace(
          'https://storage.googleapis.com/yelli-bebb3.appspot.com/',
          ''
        );

        const bucketName = 'yelli-bebb3.appspot.com';

        const bucket = admin.storage().bucket(bucketName);
        await bucket.file(photoRef).delete();
      }

      admin.firestore().collection('events').doc(eventId).delete();
    } catch (err) {
      console.log('delete photo error :', err);
    }
  });
};

export default deleteEvent;
