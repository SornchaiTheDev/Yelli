import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Store from 'renderer/utils/store';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { Theme } from 'renderer/utils/interface/theme';
import SaveBtn from './components/SaveBtn';
import WithSideBar from '../HOC/withSideBar';

function Themes() {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeContext();
  const [_theme, _setTheme] = useState<Theme>(theme);
  const [isThemeChanged, setIsThemeChanged] = useState<boolean>(false);
  const store = new Store();

  useEffect(() => {
    setIsThemeChanged(JSON.stringify(_theme) !== JSON.stringify(theme));
  }, [_theme, theme]);

  const handleThemeSetting = () => {
    setTheme(_theme);
    store.set('theme', _theme);
  };
  const revertThemeSetting = () => {
    store.get('theme').then((res) => _setTheme(res));
  };

  return (
    <WithSideBar>
      <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
        {t('setting.theme.title')}
      </h1>

      <div className="flex flex-col space-y-4 px-4">
        {Object.keys(_theme)
          .filter((key) => key !== 'type')
          .map((key) => {
            const palette = _theme[key as 'primary' | 'background' | 'text'];
            const { name, color } = palette;

            return (
              <div key={key}>
                <h1 className="font-medium">{t(name)}</h1>
                <div className="flex items-center space-x-2 relative w-fit">
                  <input
                    type="text"
                    className="rounded-lg"
                    value={color}
                    onChange={(e) =>
                      _setTheme((theme) => ({
                        ...theme,
                        [key]: { ...palette, color: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="color"
                    onChange={(e) =>
                      _setTheme((theme) => ({
                        ...theme,
                        [key]: { ...palette, color: e.target.value },
                      }))
                    }
                    value={color}
                    className="w-6 h-6"
                  />
                </div>
              </div>
            );
          })}
      </div>
      <SaveBtn
        show={isThemeChanged}
        theme={theme}
        handleThemeSetting={handleThemeSetting}
        revertThemeSetting={revertThemeSetting}
      />
    </WithSideBar>
  );
}

export default Themes;
