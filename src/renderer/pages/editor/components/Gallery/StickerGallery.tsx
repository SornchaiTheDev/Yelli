import balloon from '../../../../../../public/stickers/balloon.png';
import crocodile from '../../../../../../public/stickers/crocodile.png';
import hny from '../../../../../../public/stickers/happy-new-year.png';
import witchHat from '../../../../../../public/stickers/witch-hat.png';
import StickerPreview from './components/StickerPreview';

const stickerSets = [balloon, witchHat, hny, crocodile];

function StickerGallery() {
  return (
    <div className="px-4">
      <h1 className="text-4xl font-bold">Stickers</h1>
      <div className="gap-4 mt-4">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {stickerSets.map((sticker) => (
            <StickerPreview sticker={sticker} key={sticker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickerGallery;
