import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';
import Photo from 'renderer/components/Photo';
import { useEditorContext } from 'renderer/context';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface UploadPhoto {
  name: string;
  path: string;
}
function Print() {
  const { selectedPhoto } = useEditorContext();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  console.log(theme);

  const [photo, setPhoto] = useState<UploadPhoto | null>(null);
  const [countdown, setCountdown] = useState<number>(30);
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.upload(selectedPhoto).then((uploadPhoto: UploadPhoto) => {
      setPhoto(uploadPhoto);
    });
  }, []);

  useEffect(() => {
    if (countdown === 0) return navigate('/explorer');
    const timeout = setTimeout(() => {
      if (countdown > 0) setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown]);

  const onPrint = () => {
    window.electron.print(photo?.path);
    navigate('/');
  };

  return (
    <div
      className="flex flex-col w-full h-screen justify-center items-center"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="flex w-full justify-center items-start space-x-4 px-4">
        <div className="flex flex-col justify-center items-center">
          <Photo
            onClick={onPrint}
            className="drop-shadow-xl w-11/12"
            path={selectedPhoto!.thumbnail as string}
          />
        </div>
        <div className="flex flex-col justify-center h-full items-center space-y-10 px-4 bg-white rounded-lg">
          <h1
            className="text-3xl font-bold text-center py-2"
            style={{ color: theme.text.color }}
          >
            {t('print.uploadTitle')}
          </h1>
          <h2
            className="text-xl text-center"
            style={{ color: theme.text.color }}
          >
            {t('print.uploadDesc')}
          </h2>
          <QRCode value={`https://pip.pics/${photo?.name}`} size={300} />

          <div
            className="px-4 py-2 border-2 rounded-md"
            style={{ backgroundColor: theme.secondary.color }}
          >
            <h3 className="text-2xl">https://pip.pics/{photo?.name}</h3>
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
      </div>
    </div>
  );
}

export default Print;
