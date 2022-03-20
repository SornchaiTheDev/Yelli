import { useState } from 'react';
import BackBtn from 'renderer/components/BackBtn';
import Photo from './components/Photo';
import { BiCool } from 'react-icons/bi';
import { MdPhotoFilter } from 'react-icons/md';
import PhotoEditor from './components/PhotoEditor';
import Button from 'renderer/components/Button';
import { onFinishDecorateInterface, SelectedPhotoInterface } from './interface';

function Editor({ photos }: { photos: SelectedPhotoInterface[] }): JSX.Element {
  const [allPhotos, setAllPhotos] = useState(photos);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhotoInterface>({
    src: photos[0].src,
  });

  const onFinishDecorate: onFinishDecorateInterface = ({ index, layers }) => {
    console.log(index);
    console.log(layers);
  };

  return (
    <div className="flex flex-col pt-2 h-screen">
      <div className="w-full pl-6 pt-2 flex justify-between items-center">
        <BackBtn />
        <Button>Print</Button>
      </div>
      <div className="grid grid-cols-6 gap-2 px-2 h-full">
        {/* Photo Viwer */}
        <div className="col-span-1 flex flex-col w-full rounded-lg shadow-xl">
          <div className="w-full rounded-t-lg flex-1 my-6 overflow-scroll">
            <div className="flex flex-col space-y-5 px-4 h-2">
              {allPhotos.map(({ src }, index) => {
                return (
                  <Photo
                    key={index}
                    onClick={() => setSelectedPhoto({ src, index })}
                    path={src}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-5 w-full h-full flex justify-center items-center space-x-5 px-5">
          {/* Photo Editor */}
          <PhotoEditor
            index={selectedPhoto.index}
            src={selectedPhoto.src}
            layers={selectedPhoto.layers}
            onFinishDecorate={onFinishDecorate}
          />

          <div className="flex flex-col justify-center space-y-8">
            <button className="flex flex-col items-center">
              <div className="p-4 bg-yellow-500 w-16 rounded-full ">
                <BiCool size="100%" />
              </div>
              <h3 className="font-semibold">Sticker</h3>
            </button>
            <button className="flex flex-col items-center">
              <div className="p-4 bg-yellow-500 w-16 rounded-full ">
                <MdPhotoFilter size="100%" />
              </div>
              <h3 className="font-semibold">Filters</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
