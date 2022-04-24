import { useThemeContext } from 'renderer/context/ThemeContext';
function Photo({
  path,
  onClick,
  className,
}: {
  path: string;
  onClick?: () => void;
  className?: string;
}) {
  const { theme } = useThemeContext();
  return (
    <div
      style={{ backgroundColor: theme.secondary.color }}
      className={`rounded-lg overflow-hidden select-none cursor-pointer flex-shrink-0 ${
        className !== undefined ? className : ''
      }`}
      onClick={onClick}
    >
      <img src={path} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
