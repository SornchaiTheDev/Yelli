import admin from 'firebase-admin';
import { ipcMain } from 'electron';

const deletePhotos = () => {
  ipcMain.handle(
    'delete_photos',
    async (_event: Event, eventId: string, selects: {src : string , id : string}[]) => {
      try {

        for (let select of selects) {
          await admin
            .firestore()
            .collection('events')
            .doc(eventId)
            .collection('photos')
            .doc(select.id)
            .delete();
            const photoRef = select.src.replace("https://storage.googleapis.com/yelli-bebb3.appspot.com/" , "")
            const ref = admin.storage().ref(photoRef)
            await ref.delete()
        }

        await admin
          .firestore()
          .collection('events')
          .doc(eventId)
          .update({
            amount: admin.firestore.FieldValue.increment(-selects.length),
          });
      }catch (err) {
        console.log("delete photo error :" , err)
      }

    }
  );
};

export default deletePhotos;
