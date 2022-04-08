import { ReactNode } from 'react';
import { useThemeContext } from 'renderer/context/ThemeContext';

function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const { theme } = useThemeContext();
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: theme.primary.color, color: theme.text.color }}
      className="text-xl font-bold outline-none rounded-full px-4 py-2 mr-2"
    >
      {children}
    </button>
  );
}

export default Button;
