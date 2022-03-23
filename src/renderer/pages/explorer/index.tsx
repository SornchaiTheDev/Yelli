import { useState } from 'react';
import mockPhoto from '../../dummy';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
import BigPhoto from './components/BigPhoto';
const Index = (): JSX.Element => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInterface[]>([]);
  const [bigPreview, setBigPreview] = useState(false);
  const { setAllPhotos } = useEditorContext();

  const handleSelectPhoto = (photo: PhotoInterface) => {
    setSelectedPhoto([photo]);
    setAllPhotos([photo]);
    setBigPreview(true);
  };

  return (
    <>
      {bigPreview && (
        <BigPhoto
          path={selectedPhoto[0].src}
          onClick={() => setBigPreview(false)}
        />
      )}
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-3xl font-bold">Select Your Image</h1>
        </div>
        <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10">
          {mockPhoto.map((photo) => (
            <Photo
              key={photo.src}
              checked={selectedPhoto.includes(photo)}
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
