import { useTranslation } from 'react-i18next';
import Store from 'renderer/utils/store';
import { useThemeContext } from 'renderer/context/ThemeContext';

function Event() {
  const { t, i18n } = useTranslation();
  const { theme } = useThemeContext();

  const store = new Store();

  return (
    <div>
      <h1 className="text-md font-medium">
        {/* {t('setting.general.title')} */}
        อีเว้นท์
      </h1>
      <input
        type="text"
        className="text-sm rounded-lg w-full caret-yellow-500 mt-4"
        placeholder="Event name (ex. Home Party)"
      />
      <button
        className="p-2 rounded-lg mt-2 font-semibold"
        style={{
          backgroundColor: theme.primary.color,
        }}
      >
        Create Event
      </button>
    </div>
  );
}

export default Event;
