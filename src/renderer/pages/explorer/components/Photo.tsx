import { PhotoInterface } from 'renderer/interface';
import Select from './Select';

function Photo({
  photo,
  onClick,
}: {
  photo: PhotoInterface;
  onClick: (path: PhotoInterface) => void;
}) {
  return (
    <div
      className="relative bg-gray-200 rounded-lg overflow-hidden select-none cursor-pointer"
      onClick={() => onClick(photo)}
    >
      <img src={photo.src} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
