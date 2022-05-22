import createEvent from './createEvent';
import getEvents from './getEvents';
import getEvent from './getEvent';
import deleteEvent from './deleteEvent';
import deletePhotos from './deletePhotos';

const eventIpcHandler = () => {
  createEvent();

  getEvents();

  getEvent();

  deleteEvent();

  deletePhotos();
};

export default eventIpcHandler;
