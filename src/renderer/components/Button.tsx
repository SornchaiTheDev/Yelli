import { ReactNode } from 'react';
import theme from '../theme.json';
function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: theme.primary, color: theme.text }}
      className="text-xl font-bold outline-none rounded-full px-4 py-2 mr-2"
    >
      {children}
    </button>
  );
}

export default Button;
