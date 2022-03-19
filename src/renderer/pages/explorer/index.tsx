import { useState } from 'react';
import BigPhoto from './components/BigPhoto';
import mockPhoto from '../../dummy';
import Photo from './components/Photo';
const Index = (): JSX.Element => {
  const [bigPreview, setBigPreview] = useState(false);
  const [PhotoSrc, setPhotoSrc] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string[]>([]);
  const [isSelect, setIsSelect] = useState(false);

  const handleSelectPhoto = (path: string) => {
    if (!isSelect) {
      setPhotoSrc(path);
      return setBigPreview(true);
    }
    if (!selectedPhoto.includes(path))
      return setSelectedPhoto((prev) => [...prev, path]);
    const allPhoto = selectedPhoto.filter((item) => item !== path);
    return setSelectedPhoto(allPhoto);
  };

  const handleSelect = () => {
    if (isSelect) setSelectedPhoto([]);
    setIsSelect(!isSelect);
  };
  return (
    <>
      {bigPreview && !isSelect && (
        <BigPhoto
          path={PhotoSrc}
          onClick={() => setBigPreview(false)}
          selectedPhoto={selectedPhoto}
        />
      )}

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
                className="text-xl font-bold outline-none rounded-full px-4 py-2 bg-yellow-500 mr-2"
                onClick={handleSelect}
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
          {mockPhoto.map(({ path }) => (
            <Photo
              checked={selectedPhoto.includes(path)}
              path={path}
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
