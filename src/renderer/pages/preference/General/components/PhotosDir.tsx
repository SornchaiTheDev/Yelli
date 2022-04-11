import { useState, useEffect } from 'react';
import { BsFolder } from 'react-icons/bs';
import Store from 'renderer/utils/store';
import { useTranslation } from 'react-i18next';

function PhotosDir() {
  const store = new Store();
  const { t } = useTranslation();
  const [photosDir, setPhotosDir] = useState<string>('');

  const handlePhotosDirSelect = () => {
    window.electron.files
      .choose('dir')
      .then((dialog: Electron.OpenDialogReturnValue) => {
        const { filePaths, canceled } = dialog;
        if (!canceled) {
          const path = filePaths[0];
          setPhotosDir(path);
          store.set('photosDir', path);
        }
      });
  };

  useEffect(() => {
    store
      .get('photosDir')
      .then((res) => res !== undefined && setPhotosDir(res));
  }, []);

  return (
    <>
      <h1 className="text-md font-medium">{t('setting.general.photosDir')}</h1>
      <div
        className="flex items-center w-full space-x-4 relative"
        onClick={handlePhotosDirSelect}
      >
        <input
          type="text"
          className="text-sm rounded-lg w-full caret-yellow-500"
          disabled
          value={photosDir}
        />
        <div className="absolute right-2">
          <BsFolder />
        </div>
      </div>
    </>
  );
}

export default PhotosDir;
