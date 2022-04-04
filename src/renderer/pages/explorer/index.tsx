import { useState, useEffect, useRef } from 'react';
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
  const [isAFK, setIsAFK] = useState<boolean>(true);
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

  const getPhotos = () => {
    setIsLoading(true);

    window.electron.files.getByTime(time).then((res: any) => {
      setTimeout(() => {
        setAllPhotos(res);
      }, 500);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isAFK && time !== null) getPhotos();
  }, [time, isAFK]);

  useEffect(() => {
    if (time === null) return;
    window.electron.files.listenFiles((_: never, file: PhotoInterface) => {
      if (file.createdTime.getHours() === time && isAFK) {
        setAllPhotos((prev) => [file, ...prev]);
      }
    });
    return () => {
      window.electron.files.unListenFiles();
    };
  }, [time, isAFK]);

  const photoViewer = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);

  const onScroll = () => {
    setScrollY(photoViewer.current!.scrollTop);
    if (photoViewer.current!.scrollTop > 0) setIsAFK(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (scrollY === 0) {
      return setIsAFK(true);
    }
    timeout = setTimeout(() => {
      if (photoViewer.current!.scrollTop === scrollY) {
        photoViewer.current!.scrollTop = 0;
        setIsAFK(true);
      }
    }, 20000);

    return () => clearTimeout(timeout);
  }, [scrollY]);

  return (
    <>
      <div className="px-10 pt-10 flex flex-col space-y-2 h-screen">
        <TimeButton selectedTime={time} onClick={(select) => setTime(select)} />
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10 px-2"
            ref={photoViewer}
            onScroll={onScroll}
          >
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
