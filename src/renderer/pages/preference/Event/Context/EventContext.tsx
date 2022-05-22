import { EventI } from '@decor/Event';
import { createContext, useState, useContext, useEffect } from 'react';

interface EventContextI {
  events: EventI[];
  addEvent: (event: EventI) => void;
  getEvent: () => void;
  deleteEvent: (id: string) => void;
}

const Context = createContext<EventContextI>({
  events: [],
  addEvent: () => {},
  getEvent: () => {},
  deleteEvent: () => {},
});

export default function EventContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<EventI[]>([]);

  const addEvent = (event: EventI) => {
    setEvents((prev) => [event, ...prev]);
  };

  const getEvent = () => {
    window.electron.get_events().then((_events: EventI[]) => {
      setEvents(_events);
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <Context.Provider value={{ events, addEvent, getEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
}

export const useEventContext = () => useContext(Context);
