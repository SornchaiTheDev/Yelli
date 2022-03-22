import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockPhoto from '../../dummy';
import Photo from './components/Photo';
import { Link } from 'react-router-dom';
const Index = (): JSX.Element => {
  const [selectedPhoto, setSelectedPhoto] = useState<string[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const navigate = useNavigate();

  const handleSelectPhoto = (path: string) => {
    if (!isSelect) {
      return navigate('/editor');
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
      <div className="px-10 pt-10 flex flex-col space-y-10 h-screen">
        <div className="flex justify-between items-center w-full ">
          <h1 className="text-3xl font-bold">
            {selectedPhoto.length === 0
              ? 'Select Your Image'
              : `Selected (${selectedPhoto.length})`}
          </h1>
          <div>
            {selectedPhoto.length > 0 && (
              <Link
                to="/editor"
                className="text-xl font-bold outline-none rounded-full px-4 py-2 bg-yellow-500 mr-2"
              >
                Next
              </Link>
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
          {mockPhoto.map(({ src }) => (
            <Photo
              checked={selectedPhoto.includes(src)}
              path={src}
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
