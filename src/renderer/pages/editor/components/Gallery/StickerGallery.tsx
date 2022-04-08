import balloon from '../../../../../../public/stickers/balloon.png';
import crocodile from '../../../../../../public/stickers/crocodile.png';
import hny from '../../../../../../public/stickers/happy-new-year.png';
import witchHat from '../../../../../../public/stickers/witch-hat.png';
import StickerPreview from './components/StickerPreview';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';

const stickerSets = [balloon, witchHat, hny, crocodile];

function StickerGallery() {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  return (
    <div className="px-4">
      <h1
        className="text-3xl font-bold"
        style={{
          color: theme.text.color,
        }}
      >
        {t('editor.stickers')}
      </h1>
      <div className="gap-4 mt-4">
        <div className="grid grid-cols-3 auto-rows-fr gap-2 mb-2">
          {stickerSets.map((sticker) => (
            <StickerPreview sticker={sticker} key={sticker} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickerGallery;
