export interface Theme {
  type: 'light' | 'dark';
  primary: { name: string; color: string };
  secondary: { name: string; color: string };
  background: { name: string; color: string };
  text: { name: string; color: string };
}

export interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
