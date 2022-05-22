import admin from 'firebase-admin';
import { ipcMain } from 'electron';

const deletePhotos = () => {
  ipcMain.handle(
    'delete_photos',
    async (_event: Event, eventId: string, selects: string[]) => {
      for (let id of selects) {
        await admin
          .firestore()
          .collection('events')
          .doc(eventId)
          .collection('photos')
          .doc(id)
          .delete();
      }

      await admin
        .firestore()
        .collection('events')
        .doc(eventId)
        .update({
          amount: admin.firestore.FieldValue.increment(-selects.length),
        });
    }
  );
};

export default deletePhotos;
