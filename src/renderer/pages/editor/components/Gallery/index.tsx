import PhotoGallery from './PhotoGallery';
import StickerGallery from './StickerGallery';

function Gallery({ selected }: { selected: 'sticker' | 'photo' }) {
  return (
    <div className="w-full rounded-t-lg flex-1 my-6 overflow-scroll">
      {selected === 'sticker' && <StickerGallery />}
      {selected === 'photo' && <PhotoGallery />}
    </div>
  );
}

export default Gallery;
