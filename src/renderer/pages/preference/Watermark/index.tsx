import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileDrop from './components/FileDrop';
import PhotoFrame from './components/PhotoFrame';

interface Banner {
  src: string;
  size: { width: number; type: string; height: number };
}

function Banner() {
  const [banner, setBanner] = useState<Banner>({
    src: '',
    size: { width: 0, height: 0, type: 'null' },
  });
  const { t } = useTranslation();
  const onImport = (banner: Banner) => {
    setBanner(banner);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">
        {t('setting.watermark.title')}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <FileDrop onImport={onImport} />
        <div className="mt-4 w-2/3">
          <PhotoFrame src={banner.src} size={banner.size} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
