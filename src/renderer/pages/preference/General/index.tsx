/**
 *
 * todos
 * - [x] get photos from location
 * - [x] choose languages
 * - [x] select printer
 *
 */
import { useTranslation } from 'react-i18next';
import PhotosDir from './components/PhotosDir';
import Language from './components/Language';
import Printers from './components/Printers';
import Event from './components/Event';

function General() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 px-4 pt-4">
        {t('setting.general.title')}
      </h1>
      <div className="flex flex-col w-3/4 space-y-4 px-4">
        <PhotosDir />
        <Language />
        <Printers />
        <Event />
      </div>
    </>
  );
}

export default General;
