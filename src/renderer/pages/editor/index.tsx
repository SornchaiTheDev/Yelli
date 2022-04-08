import { useEffect } from 'react';
import PhotoEditor from './components/PhotoEditor';
import Button from 'renderer/components/Button';
import { useEditorContext } from 'renderer/context';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import DrawGallery from './components/Gallery/DrawGallery';
import StickerGallery from './components/Gallery/StickerGallery';
import { useTranslation } from 'react-i18next';

function Content() {
  const { selectedPhoto, handlePrint } = useEditorContext();
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedPhoto === null) navigate('/explorer');
  }, [selectedPhoto]);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="w-full pl-6 py-2 flex justify-between items-center">
        <Button onClick={() => navigate('/')}>{t('editor.btn.cancel')}</Button>
        <div>
          <Button
            onClick={() => {
              handlePrint();
            }}
          >
            {t('editor.btn.done')}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2 px-2 h-full">
        {/* Photo Viwer */}
        <div className="col-span-2 flex flex-col w-full rounded-lg shadow-xl bg-white">
          <div className="flex-1 my-6   overflow-scroll px-6">
            <div className="h-2">
              <DrawGallery />
              <StickerGallery />
            </div>
          </div>
        </div>

        <div className="col-span-8 self-center">
          {/* Photo Editor */}
          {selectedPhoto && (
            <PhotoEditor src={selectedPhoto!.src} bannerHeight={101} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;
