import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InputSticker from './components/InputSticker';

import Sticker from './components/Sticker';
interface StickerInterface {
  src: string;
}
function Stickers() {
  const { t } = useTranslation();
  const [stickers, setStickers] = useState<StickerInterface[]>([]);

  useEffect(() => {
    window.electron.stickers
      .get()
      .then((_stickers: StickerInterface[]) => setStickers(_stickers));
  }, []);

  const onImport = (src: StickerInterface[]) => {
    setStickers((prev) => [...prev, ...src]);
  };

  const onRemove = (src: string) => {
    window.electron.stickers.remove(src);
    setStickers((prev) => prev.filter((sticker) => sticker.src !== src));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">
        {t('setting.stickers.title')}
      </h1>
      <InputSticker onImport={onImport} />

      <div className="grid grid-cols-5 gap-4 mt-10">
        {stickers.map(({ src }) => (
          <Sticker key={src} src={src} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

export default Stickers;
