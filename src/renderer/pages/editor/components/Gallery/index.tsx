import PhotoGallery from './PhotoGallery';
import StickerGallery from './StickerGallery';

function Gallery({ selected }: { selected: 'sticker' | 'photo' }) {
  if (selected === 'sticker') return <StickerGallery />;
  if (selected === 'photo') return <PhotoGallery />;
  return <h1>No Select</h1>;
}

export default Gallery;
