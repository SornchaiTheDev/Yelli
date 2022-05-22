import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { UploadPhoto } from './interface';
import Upload from './components/Upload';

function Print() {
  const { selectedPhoto } = useEditorContext();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<UploadPhoto | null>(null);
  const [countdown, setCountdown] = useState<number>(30);

  useEffect(() => {
    if (selectedPhoto === null) {
      return navigate('/explorer');
    }

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
  };

  return (
    <div
      className="flex flex-col w-full h-screen justify-center items-center"
      style={{ backgroundColor: theme.background.color }}
    >
      <div className="flex w-full justify-center items-start space-x-4 px-4">
        {selectedPhoto && (
          <>
            <div className="flex flex-col justify-center items-center">
              <Photo
                onClick={onPrint}
                className="drop-shadow-xl w-11/12"
                path={selectedPhoto!.thumbnail as string}
              />
            </div>
            <Upload photo={photo} countdown={countdown} />
          </>
        )}
      </div>
    </div>
  );
}

export default Print;
