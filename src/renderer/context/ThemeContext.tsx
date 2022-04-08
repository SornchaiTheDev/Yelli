import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Theme, ThemeContext } from 'renderer/utils/interface/theme';
import Store from 'renderer/utils/store';

const ThemeContext = createContext<ThemeContext>({
  theme: {
    type: 'light',
    primary: {
      name: 'setting.theme.primary',
      color: '#f59e0b',
    },
    secondary: {
      name: 'setting.theme.secondary',
      color: '#2A2A2A',
    },
    background: {
      name: 'setting.theme.secondary',
      color: '#ffffff',
    },
    text: {
      name: 'setting.theme.text',
      color: '#2A2A2A',
    },
  },
  setTheme: () => {},
});

function ThemeContextComponent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [theme, setTheme] = useState<Theme>({
    type: 'light',
    primary: {
      name: 'setting.theme.primary',
      color: '#f59e0b',
    },
    secondary: {
      name: 'setting.theme.secondary',
      color: '#2A2A2A',
    },
    background: {
      name: 'setting.theme.background',
      color: '#ffffff',
    },
    text: {
      name: 'setting.theme.text',
      color: '#2A2A2A',
    },
  });

  const store = new Store();
  const getTheme = async () => {
    const themeStore = await store.get('theme');
    if (themeStore) setTheme(themeStore);
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextComponent;

export const useThemeContext = () => useContext(ThemeContext);
