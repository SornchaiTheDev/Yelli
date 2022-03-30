import { useState, useEffect } from 'react';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
import { useNavigate } from 'react-router-dom';

const Index = (): JSX.Element => {
  const [previewPhoto, setpreviewPhoto] = useState<PhotoInterface | null>(null);
  const [bigPreview, setBigPreview] = useState(false);
  const { setSelectedPhoto } = useEditorContext();
  const [allPhotos, setAllPhotos] = useState<PhotoInterface[] | []>([]);
  const [newPhoto, setNewPhoto] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setpreviewPhoto(photo);
    setSelectedPhoto({ ...photo, thumbnail: photo.src });
    setBigPreview(true);
    navigate('/editor');
  };

  useEffect(() => {
    console.log('useEffect');
    window.electron.files
      .listenFiles()
      .then((res: PhotoInterface[]) => setAllPhotos(res));

    window.electron.files.newFiles((event, file) => {
      // if (allPhotos.length <= 10) {
      //   const files = await window.electron.files.listenFiles();
      //   console.log(files);
      setTimeout(() => {
        setAllPhotos((prev) => [...prev, file]);
      }, 500);
      // }
    });
  }, []);

  return (
    <>
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-3xl font-bold">Select Your Image</h1>
        </div>
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
      </div>
    </>
  );
};

export default Index;
