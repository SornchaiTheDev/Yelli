import admin from 'firebase-admin';
import { ipcMain } from 'electron';
import { PhotoI } from '@decor/Event';

const getPhotos = () => {
  ipcMain.handle('get_event', async (_e: Event, id: string) => {
    let event;
    const fetchEvent = await admin
      .firestore()
      .collection('events')
      .doc(id)
      .get();
    event = fetchEvent.data();
    const photos: PhotoI[] = [];
    const fetchPhotos = await admin
      .firestore()
      .collection('events')
      .doc(id)
      .collection('photos')
      .limit(10)
      .get();
    fetchPhotos.forEach((doc) =>
      photos.push({ ...(doc.data() as PhotoI), id: doc.id })
    );
    return { event, photos, id };
  });
};

export default getPhotos;
