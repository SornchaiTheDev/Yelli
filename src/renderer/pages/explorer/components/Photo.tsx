import { PhotoInterface } from 'renderer/interface';
import Select from './Select';

function Photo({
  photo,
  checked,
  isSelect,
  onClick,
}: {
  photo: PhotoInterface;
  checked: boolean;
  isSelect?: boolean;
  photoSrc?: string;
  onClick: (path: PhotoInterface) => void;
}) {
  return (
    <div
      className="relative bg-gray-200 rounded-lg overflow-hidden select-none cursor-pointer"
      onClick={() => onClick(photo)}
    >
      {isSelect && (
        <Select className="absolute top-2 right-2" checked={checked} />
      )}
      <img src={photo.src} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
