import { useTranslation } from 'react-i18next';
import CreateEvent from './Components/CreateEvent';
import Events from './Components/Events';
import WithSideBar from '../HOC/withSideBar';
import { useEffect, useState } from 'react';
import { EventI } from '@decor/Event';

function index() {
  const { t } = useTranslation();

  const [events, setEvents] = useState<EventI[]>([]);

  const getEvent = () => {
    window.electron.get_events().then((_events: EventI[]) => {
      console.log(_events);
      setEvents(_events);
    });
  };

  const addEvent = (event: EventI) => {
    setEvents((prev) => [event, ...prev]);
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <WithSideBar>
      <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
        {t('setting.event.title')}
      </h1>
      <div className="flex flex-col w-full space-y-4 px-4">
        <CreateEvent onCreate={addEvent} />
        <Events events={events} />
      </div>
    </WithSideBar>
  );
}

export default index;
