import { useState, useEffect, useMemo } from 'react';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TimeButton from './components/TimeButton';

const Index = (): JSX.Element => {
  const { setSelectedPhoto } = useEditorContext();
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[] | []>([]);
  const [time, setTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setSelectedPhoto({ ...photo, thumbnail: photo.src });
    navigate('/editor');
  };

  useEffect(() => {
    window.electron.files
      .timeButtons()
      .then(({ last_ctime }: { first_ctime: number; last_ctime: number }) => {
        setTime(last_ctime);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    window.electron.files.getByTime(time).then((res: any) => {
      setAllPhotos(res);
      setIsLoading(false);
    });
  }, [time]);

  useEffect(() => {
    setIsLoading(true);
    if (time === null) return;
    window.electron.files.listenFiles((_: never, file: PhotoInterface) => {
      if (file.createdTime.getHours() === time) {
        setAllPhotos((prev) => [file, ...prev]);
      }
      setIsLoading(false);
    });
    return () => window.electron.files.unListenFiles();
  }, [time]);

  return (
    <>
      <div className="px-10 pt-10 flex flex-col space-y-2 h-screen">
        <TimeButton selectedTime={time} onClick={(select) => setTime(select)} />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10 px-2">
            {allPhotos
              .sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime())
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
