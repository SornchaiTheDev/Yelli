import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { v4 as uuid } from 'uuid';
import { EventI } from '@decor/Event';
import { useEventContext } from '../Context/EventContext';
import Store from 'renderer/utils/store';

function Event() {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { addEvent } = useEventContext();
  const store = new Store();

  const [eventName, setEventName] = useState<string>('');

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setEventName(e.currentTarget.value);
  };

  const handleCreateEvent = () => {
    if (eventName.length > 0) {
      const event = {
        name: eventName,
        id: uuid(),
        imgset: [{ src: null }, { src: null }, { src: null }, { src: null }],
        amount: 0,
        date: { _seconds: Date.now() / 1000 },
      } as EventI;

      window.electron.create_event(event);
      addEvent(event);
      store.set('event', event);
      setEventName('');
    }
  };
  return (
    <div className="w-full flex gap-2 items-center">
      <input
        type="text"
        value={eventName}
        onChange={handleInputChange}
        className="flex-1 text-sm rounded-lg caret-yellow-500 h-full p-2"
        placeholder={t('setting.event.createEvent.title')}
      />

      <button
        onClick={handleCreateEvent}
        className="rounded-lg font-semibold h-full p-2"
        style={{
          backgroundColor: theme.primary.color,
        }}
      >
        {t('setting.event.createEvent.btn')}
      </button>
    </div>
  );
}

export default Event;
