import { useState, useEffect } from 'react';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
import { useNavigate } from 'react-router-dom';
import { BiTime } from 'react-icons/bi';
import { Player } from '@lottiefiles/react-lottie-player';
import loading from '../../../../assets/loading.json';
import Loading from './components/Loading';

const Index = (): JSX.Element => {
  const [previewPhoto, setpreviewPhoto] = useState<PhotoInterface | null>(null);
  const [bigPreview, setBigPreview] = useState(false);
  const { setSelectedPhoto } = useEditorContext();
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[] | []>([]);
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const [time, setTime] = useState<string>('19');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setpreviewPhoto(photo);
    setSelectedPhoto({ ...photo, thumbnail: photo.src });
    setBigPreview(true);
    navigate('/editor');
  };

  const getPhotos = async () => {
    setIsLoading(true);
    const photos = await window.electron.files.listenFiles();
    setAllPhotos(photos);
    setIsLoading(false);
    window.electron.files.newFiles((_: never, file: PhotoInterface) => {
      setTimeout(() => {
        setAllPhotos((prev) => [...prev, file]);
      }, 500);
    });
  };

  useEffect(() => {
    getPhotos();
  }, []);
  const selected = 'border-4 border-gray-900';

  return (
    <>
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex space-x-2">
          <div
            onClick={() => setTime('19')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '19' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">19:00</h2>
          </div>
          <div
            onClick={() => setTime('20')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '20' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">20:00</h2>
          </div>
          <div
            onClick={() => setTime('21')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '21' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">21:00</h2>
          </div>
          <div
            onClick={() => setTime('22')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '22' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">22:00</h2>
          </div>
          <div
            onClick={() => setTime('23')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '23' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">23:00</h2>
          </div>
          <div
            onClick={() => setTime('00')}
            className={`bg-yellow-500 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer ${
              time === '00' ? selected : ''
            }
              `}
          >
            <BiTime />
            <h2 className="text-lg font-bold">00:00</h2>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10 px-2">
            {allPhotos
              .sort((a, b) => b.createdTime - a.createdTime)
              .map((photo) => (
                <Photo
                  key={photo.thumbnail}
                  photo={photo}
                  onClick={handleSelectPhoto}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
