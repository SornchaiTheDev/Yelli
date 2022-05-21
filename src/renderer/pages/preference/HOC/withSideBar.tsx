import { ReactNode } from 'react';
import { BsGear, BsPalette, BsHeart, BsCalendar2Event } from 'react-icons/bs';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

function withSideBar({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  const menu = [
    {
      name: 'General',
      icon: <BsGear color={theme.text.color} />,
      path: '/preference',
    },
    {
      name: 'Theme',
      icon: <BsPalette color={theme.text.color} />,
      path: '/preference/Theme',
    },
    {
      name: 'Sticker',
      icon: <BsHeart color={theme.text.color} />,
      path: '/preference/Sticker',
    },
    {
      name: 'Watermark',
      icon: <AiOutlineFileImage color={theme.text.color} />,
      path: '/preference/Watermark',
    },
    {
      name: 'Event',
      icon: <BsCalendar2Event color={theme.text.color} />,
      path: '/preference/Event',
    },
  ];

  return (
    <div
      className="grid grid-cols-5 h-screen w-full"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="col-span-1 flex flex-col justify-start items-start w-full h-full space-y-2 px-2 border-r-2 pt-4">
        <h1 className="text-xl font-semibold">{t('setting.title')}</h1>
        {menu.map(({ name, icon, path }) => (
          <div
            key={name}
            onClick={() => navigate(path)}
            style={{
              backgroundColor:
                location.pathname === path ? theme.primary.color : '',
            }}
            className={`flex items-center space-x-4 p-2 w-full cursor-pointer ${
              location.pathname === path ? 'rounded-lg' : ''
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
        {children}
      </div>
    </div>
  );
}

export default withSideBar;
