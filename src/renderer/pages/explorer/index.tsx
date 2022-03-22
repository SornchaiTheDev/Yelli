import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockPhoto from '../../dummy';
import Photo from './components/Photo';
import { useEditorContext } from 'renderer/context';
import { PhotoInterface } from 'renderer/interface';
const Index = (): JSX.Element => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInterface[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const { setAllPhotos } = useEditorContext();
  const navigate = useNavigate();

  const handleSelectPhoto = (photo: PhotoInterface) => {
    if (!isSelect) {
      setAllPhotos([photo]);
      return navigate('/editor');
    }
    const isExist = selectedPhoto.find((p) => p.src === photo.src);
    if (!isExist) return setSelectedPhoto((prev) => [...prev, photo]);
    const allPhoto = selectedPhoto.filter((item) => item !== photo);
    return setSelectedPhoto(allPhoto);
  };

  const handleSelect = () => {
    if (isSelect) setSelectedPhoto([]);

    setIsSelect(!isSelect);
  };

  const handleGroupPhotos = () => {
    setAllPhotos(selectedPhoto);
    navigate('/editor');
  };

  return (
    <>
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-3xl font-bold">
            {selectedPhoto.length === 0
              ? 'Select Your Image'
              : `Selected (${selectedPhoto.length})`}
          </h1>
          <div>
            {selectedPhoto.length > 0 && (
              <button
                onClick={handleGroupPhotos}
                className="text-xl font-bold outline-none rounded-full px-4 py-2 bg-yellow-500 mr-2"
              >
                Next
              </button>
            )}
            <button
              className="text-xl font-bold outline-none rounded-full px-4 py-2 bg-yellow-500"
              onClick={handleSelect}
            >
              {!isSelect ? 'Select' : 'Cancel'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 auto-rows-min place-items-center gap-6  h-full overflow-auto pb-10">
          {mockPhoto.map((photo) => (
            <Photo
              checked={selectedPhoto.includes(photo)}
              photo={photo}
              isSelect={isSelect}
              onClick={handleSelectPhoto}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
