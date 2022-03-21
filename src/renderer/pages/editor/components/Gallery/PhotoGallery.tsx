import Photo from '../Photo';
import { useEditorContext } from '../../context';

const PhotoGallery = () => {
  const { allPhotos, handleSelectPhoto } = useEditorContext();
  return (
    <div className="flex flex-col space-y-5 px-4 h-2">
      {allPhotos.map(({ src, stickers }, index) => {
        return (
          <Photo
            key={index}
            onClick={() => handleSelectPhoto({ src, stickers, index })}
            path={src}
          />
        );
      })}
    </div>
  );
};

export default PhotoGallery;
