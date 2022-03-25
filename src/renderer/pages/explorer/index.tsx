import { useState, useEffect } from 'react';
import mockPhoto from '../../dummy';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
import BigPhoto from './components/BigPhoto';

const Index = (): JSX.Element => {
  const [previewPhoto, setpreviewPhoto] = useState<PhotoInterface | null>(null);
  const [bigPreview, setBigPreview] = useState(false);
  const { setSelectedPhoto } = useEditorContext();
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[] | []>([]);

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setpreviewPhoto(photo);
    setSelectedPhoto({ ...photo, thumbnail: photo.src });
    setBigPreview(true);
  };

  useEffect(() => {
    window.electron.getFiles('./public/mock_photo');
    window.electron.listenFiles('files:receive', (arg: any) => {
      setAllPhotos(arg);
    });
  }, []);

  return (
    <>
      {bigPreview && (
        <BigPhoto
          path={previewPhoto!.src}
          onClick={() => setBigPreview(false)}
        />
      )}
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-3xl font-bold">Select Your Image</h1>
        </div>
        <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10">
          {allPhotos.map((photo) => (
            <Photo key={photo.src} photo={photo} onClick={handleSelectPhoto} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
