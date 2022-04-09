/**
 *
 * todos
 * - [ ] customize theme colors
 *
 */
import { useTranslation } from 'react-i18next';
import Store from 'renderer/utils/store';
import { useState } from 'react';

import { useThemeContext } from 'renderer/context/ThemeContext';
import { Theme } from 'renderer/utils/interface/theme';

function Themes() {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeContext();
  const [_theme, _setTheme] = useState<Theme>(theme);
  const store = new Store();

  const handleThemeSetting = () => {
    setTheme(_theme);
    store.set('theme', _theme);
  };
  const revertThemeSetting = () => {
    store.get('theme').then((res) => _setTheme(res));
  };

  return (
    <>
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
      <div className="fixed bottom-0 bg-white flex space-x-2 w-full px-4 py-4 border-t-2">
        <div
          style={{ backgroundColor: theme.primary.color }}
          className="rounded-lg flex justify-center px-4 py-2 cursor-pointer"
          onClick={handleThemeSetting}
        >
          <h1
            className="text-md font-medium"
            style={{ color: theme.text.color }}
          >
            Set Theme
          </h1>
        </div>
        <div
          style={{ backgroundColor: theme.secondary.color }}
          className="rounded-lg flex justify-center px-4 py-2 cursor-pointer"
          onClick={revertThemeSetting}
        >
          <h1
            className="text-md font-medium"
            style={{ color: theme.text.color }}
          >
            Cancel
          </h1>
        </div>
      </div>
    </>
  );
}

export default Themes;
