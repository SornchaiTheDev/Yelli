import createEvent from './createEvent';
import getEvents from './getEvents';
import getEvent from './getEvent';

const eventIpcHandler = () => {
  createEvent();

  getEvents();

  getEvent();
};

export default eventIpcHandler;
