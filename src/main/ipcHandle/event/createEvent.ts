import { ipcMain } from 'electron';
import admin from 'firebase-admin';
import { EventI } from '@decor/Event';
const create_event = () => {
  ipcMain.handle('create_event', async (_e: Event, event: EventI) => {
    await admin.firestore().collection('events').doc(event.id).set({
      name: event.name,
      amount: 0,
      date: admin.firestore.FieldValue.serverTimestamp(),
    });
    await admin
      .firestore()
      .collection('count')
      .doc('events')
      .update({ amount: admin.firestore.FieldValue.increment(1) });
  });
};

export default create_event;
