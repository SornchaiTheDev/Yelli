import { useThemeContext } from 'renderer/context/ThemeContext';
import { GrFormClose } from 'react-icons/gr';

function Sticker({
  src,
  onRemove,
}: {
  src: string;
  onRemove: (src: string) => void;
}) {
  const { theme } = useThemeContext();

  return (
    <div
      style={{ backgroundColor: theme.secondary.color }}
      className="p-4 rounded-lg relative w-28 h-28"
    >
      <div
        className="absolute w-6 h-6 bg-red-500 -right-2 -top-2 rounded-full flex justify-center items-center"
        onClick={() => onRemove(src)}
      >
        <GrFormClose />
      </div>
      <img className="pointer-events-none w-full" src={src} />
    </div>
  );
}

export default Sticker;
