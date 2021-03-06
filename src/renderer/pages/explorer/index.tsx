import { useState, useEffect, useRef } from 'react';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { PhotoInterface } from 'renderer/utils/interface';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TimeButton from './components/TimeButton';
import Store from 'renderer/utils/store';

interface Ctime {
  first_ctime: number;
  last_ctime: number;
}

const Explorer = (): JSX.Element => {
  const store = new Store();
  const { setSelectedPhoto } = useEditorContext();
  const { theme } = useThemeContext();
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[] | []>([]);
  const [time, setTime] = useState<number | null>(null);
  const [remains, setRemains] = useState<number | null>(null);
  const [cTime, setCTime] = useState<Ctime | null>({
    first_ctime: 0,
    last_ctime: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAFK, setIsAFK] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setSelectedPhoto({ ...photo, thumbnail: photo.src });
    navigate('/editor');
  };

  const makeTimeButtons = () => {
    window.electron.files.timeButtons().then((res: any) => {
      if (res === 'no-photos') return setCTime(null);
      if (isAFK) setTime(res.last_ctime % 24);
      setCTime(res);
    });
  };

  const getPhotos = () => {
    setIsLoading(true);

    window.electron.files.getByTime(time).then((res: any) => {
      setTimeout(() => {
        setAllPhotos(res);
        setIsLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    if (isAFK) getPhotos();
  }, [time, isAFK]);

  useEffect(() => {
    window.electron.files.onPhotosDirChange(() => {
      makeTimeButtons();
      setAllPhotos([]);
      getPhotos();
    });
    return () => window.electron.files.unsubscribePhotosDirChange();
  }, []);

  useEffect(() => {
    window.electron.files.listenFiles((_: never, file: PhotoInterface) => {
      makeTimeButtons();
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
    if (time !== cTime!.last_ctime) return;
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

  const handleTimeButton = (select: number) => {
    if (photoViewer.current) photoViewer.current!.scrollTop = 0;
    setTime(select);
  };

  return (
    <>
      <div
        className="px-10 pt-10 flex flex-col space-y-2 h-screen"
        style={{ backgroundColor: theme.background.color }}
      >
        {cTime !== null && (
          <TimeButton
            cTime={cTime}
            selectedTime={time}
            onClick={handleTimeButton}
          />
        )}
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

export default Explorer;
