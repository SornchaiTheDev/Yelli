import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'renderer/context/ThemeContext';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { UploadPhoto } from '../interface';

function Upload({
  photo,
  countdown,
}: {
  photo: UploadPhoto | null;
  countdown: number;
}) {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const photoName = photo !== null ? photo.name.split('.')[0] : '';

  return (
    <div className="flex flex-col justify-center h-full items-center space-y-10 px-4 bg-white rounded-lg">
      <h1
        className="text-3xl font-bold text-center py-2"
        style={{ color: theme.text.color }}
      >
        {t('print.uploadTitle')}
      </h1>
      <h2 className="text-xl text-center" style={{ color: theme.text.color }}>
        {t('print.uploadDesc')}
      </h2>
      {photo && (
        <QRCode value={`http://192.168.1.8:3000/${photoName}`} size={300} />
      )}

      <div
        className="px-4 py-2 border-2 rounded-md"
        style={{ backgroundColor: theme.secondary.color }}
      >
        {photo && (
          <h3 className="text-2xl">http://192.168.1.8:3000/{photoName}</h3>
        )}
      </div>

      <Link
        to="/"
        style={{
          backgroundColor: theme.primary.color,
          color: theme.text.color,
        }}
        className="w-full text-center py-4 text-xl font-bold rounded-lg"
      >
        {t('print.btn.close')} ({countdown})
      </Link>
    </div>
  );
}

export default Upload;
