import { useState, useEffect } from 'react';
import StickerPreview from './components/StickerPreview';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';
interface StickerInterface {
  src: string;
}

function StickerGallery() {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const [stickers, setStickers] = useState<StickerInterface[]>([]);

  useEffect(() => {
    window.electron.stickers
      .get()
      .then((_stickers: StickerInterface[]) => setStickers(_stickers));
  }, []);
  return (
    <div className="p-4 border-4 border-gray-300 rounded-lg mt-4">
      <h1
        className="text-2xl font-bold"
        style={{
          color: theme.text.color,
        }}
      >
        {t('editor.stickers')}
      </h1>
      <div className="gap-4 mt-4">
        <div className="grid grid-cols-3 auto-rows-fr gap-2 mb-2">
          {stickers.map(({ src }) => (
            <StickerPreview sticker={src} key={src} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickerGallery;
