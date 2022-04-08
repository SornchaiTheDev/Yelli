import { useState } from 'react';
import { BsGear, BsPalette } from 'react-icons/bs';
import General from './General';
import Themes from './Themes';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';

function Preference() {
  const [selected, setSelected] = useState<string>('General');
  const { theme } = useThemeContext();
  const menu = [
    { name: 'General', icon: <BsGear color={theme.text.color} /> },
    { name: 'Theme', icon: <BsPalette color={theme.text.color} /> },
  ];

  const { t } = useTranslation();
  return (
    <div
      className="grid grid-cols-5 h-screen w-full"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="col-span-1 flex flex-col justify-start items-start w-full h-full space-y-2 px-2 border-r-2 pt-4">
        <h1 className="text-xl font-semibold">{t('setting.title')}</h1>
        {menu.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setSelected(name)}
            style={{
              backgroundColor: selected === name ? theme.primary.color : '',
            }}
            className={`flex items-center space-x-4 p-2 w-full cursor-pointer ${
              selected === name ? 'rounded-lg' : ''
            }`}
          >
            {icon}
            <h1 className="text-gray-900" style={{ color: theme.text.color }}>
              {name}
            </h1>
          </div>
        ))}
      </div>
      <div
        className="col-span-4"
        style={{ backgroundColor: theme.background.color }}
      >
        {selected === 'General' && <General />}
        {selected === 'Theme' && <Themes />}
      </div>
    </div>
  );
}

export default Preference;
