import Photo from '../Photo';
import { useEditorContext } from '../../context';

const PhotoGallery = () => {
  const { allPhotos, handleSelectPhoto } = useEditorContext();
  return (
    <div className="flex flex-col space-y-5 px-4 h-2">
      {allPhotos.map(({ src, stickers, thumbnail }, index) => {
        return (
          <Photo
            key={index}
            onClick={() =>
              handleSelectPhoto({
                src: src,
                stickers,
                index,
              })
            }
            path={thumbnail !== undefined ? thumbnail : src}
          />
        );
      })}
    </div>
  );
};

export default PhotoGallery;
