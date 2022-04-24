import { useState, useEffect } from 'react';
import StickerPreview from './components/StickerPreview';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';

function StickerGallery() {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const [stickersSrc, setStickersSrc] = useState<string[]>([]);

  useEffect(() => {
    window.electron.stickers
      .get()
      .then((_stickers: string[]) => setStickersSrc(_stickers));
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
          {stickersSrc.map((src: string) => (
            <StickerPreview sticker={src} key={src} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickerGallery;
