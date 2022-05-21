import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Store from 'renderer/utils/store';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { v4 as uuid } from 'uuid';

function Event() {
  const { t, i18n } = useTranslation();
  const { theme } = useThemeContext();
  const store = new Store();
  const [eventName, setEventName] = useState<string>('');

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setEventName(e.currentTarget.value);
  };

  const handleCreateEvent = () => {
    window.electron.create_event({ name: eventName, id: uuid() });
    // store.set('event', JSON.stringify({ name: eventName, id: uuid() }));
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
      {/* <div className="rounded-lg bg-yellow-500 p-2">Create Event</div> */}
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
