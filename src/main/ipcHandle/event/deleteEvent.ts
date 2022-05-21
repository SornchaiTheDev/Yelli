import admin from 'firebase-admin';
import { ipcMain } from 'electron';

const deleteEvent = () => {
  ipcMain.handle('delete_event', (_event: Event, eventId: string) => {
    admin.firestore().collection('events').doc(eventId).delete();
  });
};

export default deleteEvent;
