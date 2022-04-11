import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FileDrop from '../components/FileDrop';

import Sticker from './components/Sticker';

function Stickers() {
  const { t } = useTranslation();
  const [stickersSrc, setStickersSrc] = useState<string[]>([]);

  useEffect(() => {
    window.electron.stickers
      .get()
      .then((_stickers: string[]) => setStickersSrc(_stickers));
  }, []);

  const onImport = (res?: string[]) => {
    setStickersSrc((prev) => [...prev, ...res!]);
  };

  const onRemove = (src: string) => {
    window.electron.stickers.remove(src);
    setStickersSrc((prev) => prev.filter((prevSrc) => prevSrc !== src));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">
        {t('setting.stickers.title')}
      </h1>
      <FileDrop drop="stickers" fileType="file-multiple" onImport={onImport} />

      <div className="grid grid-cols-5 gap-4 mt-10">
        {stickersSrc.map((src: string) => (
          <Sticker key={src} src={src} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

export default Stickers;
