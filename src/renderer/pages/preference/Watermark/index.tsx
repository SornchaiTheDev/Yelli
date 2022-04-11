import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import FileDrop from '../components/FileDrop';
import PhotoFrame from './components/PhotoFrame';
import { Banner } from './interface/';

function Banner() {
  const [banner, setBanner] = useState<Banner>({
    src: '',
    size: { width: 0, height: 0, type: 'null' },
  });
  const { t } = useTranslation();
  const onImport = () => {
    window.electron.banner.get().then((banner: any) => {
      setBanner(banner);
    });
  };
  const onRemove = () => {
    window.electron.banner.remove(banner.src).then(() => {
      setBanner({ src: '', size: { width: 0, height: 0, type: 'null' } });
    });
  };

  useEffect(() => {
    window.electron.banner.get().then((banner: any) => {
      if (banner === 'no-banner') return;
      setBanner(banner);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">
        {t('setting.watermark.title')}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <FileDrop drop="watermark" fileType="file-single" onImport={onImport} />
        <div className="mt-4 w-2/3 relative">
          <PhotoFrame src={banner.src} size={banner.size} />
          {banner.src !== '' && (
            <div
              className="absolute w-6 h-6 bg-red-500 -right-2 -top-2 rounded-full flex justify-center items-center"
              onClick={() => onRemove()}
            >
              <GrFormClose />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
