import { PhotoInterface } from 'renderer/utils/interface';
import { useThemeContext } from 'renderer/context/ThemeContext';

function Photo({
  photo,
  onClick,
}: {
  photo: PhotoInterface;
  onClick: (path: PhotoInterface) => void;
}) {
  const { theme } = useThemeContext();
  return (
    <div
      style={{ backgroundColor: theme.secondary.color }}
      className="relative rounded-lg overflow-hidden select-none cursor-pointer"
      onClick={() => onClick(photo)}
    >
      <img src={photo.thumbnail} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
