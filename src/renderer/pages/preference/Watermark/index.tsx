import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import FileDrop from '../components/FileDrop';
import PhotoFrame from './components/PhotoFrame';
import { watermarkInterface } from './interface/';

function watermark() {
  const { t } = useTranslation();
  const [watermark, setWatermark] = useState<watermarkInterface>({
    src: '',
    size: { width: 0, height: 0, type: 'null' },
  });
  const onImport = () => {
    window.electron.watermark.get().then((watermark: any) => {
      setWatermark(watermark);
    });
  };
  const onRemove = () => {
    window.electron.watermark.remove(watermark.src).then(() => {
      setWatermark({ src: '', size: { width: 0, height: 0, type: 'null' } });
    });
  };

  useEffect(() => {
    window.electron.watermark.get().then((watermark: any) => {
      if (watermark === 'no-watermark') return;
      setWatermark(watermark);
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
          <PhotoFrame src={watermark.src} size={watermark.size} />
          {watermark.src !== '' && (
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

export default watermark;
