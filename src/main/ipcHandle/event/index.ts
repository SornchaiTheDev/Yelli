import createEvent from './createEvent';
import getEvents from './getEvents';
import getEvent from './getEvent';
import deleteEvent from './deleteEvent';

const eventIpcHandler = () => {
  createEvent();

  getEvents();

  getEvent();

  deleteEvent();
};

export default eventIpcHandler;
