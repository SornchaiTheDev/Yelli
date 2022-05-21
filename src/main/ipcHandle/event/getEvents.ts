import { ipcMain } from 'electron';
import admin from 'firebase-admin';
import { EventI, PhotoI } from '@decor/Event';

const getEvents = () => {
  ipcMain.handle('get_events', async (_e: Event) => {
    const events: EventI[] = [];
    const docs = await admin.firestore().collection('events').get();
    docs.forEach((event) => {
      events.push({
        ...(event.data() as EventI),
        id: event.id,
      });
    });

    let index = 0;
    for await (let event of events) {
      const getPhotos = await admin
        .firestore()
        .collection('events')
        .doc(event.id)
        .collection('photos')
        .limit(4)
        .orderBy('created_at', 'desc')
        .get();

      let photos: PhotoI[] = [];
      getPhotos.forEach((photo) => photos.push(photo.data() as PhotoI));
      console.log(photos.length);
      if (photos.length < 4) {
        photos = photos.concat(
          Array(4 - photos.length).fill({ src: null })
        ) as PhotoI[];
      }

      events[index] = { ...event, imgset: photos, id: event.id };
      index += 1;
    }

    return events;
  });
};

export default getEvents;
