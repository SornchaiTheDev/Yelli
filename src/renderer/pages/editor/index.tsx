import { useState } from 'react';
import PhotoEditor from './components/PhotoEditor';
import Button from 'renderer/components/Button';
import Gallery from './components/Gallery';
import { useEditorContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import DrawGallery from './components/Gallery/DrawGallery';
import StickerGallery from './components/Gallery/StickerGallery';

function Content() {
  const { allPhotos, selectedPhoto } = useEditorContext();
  const [menu, setMenu] = useState<'photo' | 'sticker' | 'draw'>('photo');
  const navigate = useNavigate();

  const handleMenuSelect = (selected: 'photo' | 'sticker' | 'draw') => {
    if (selected === menu) return setMenu('photo');
    setMenu(selected);
  };

  return (
    <div className="flex flex-col pt-2 h-screen">
      <div className="w-full pl-6 pt-2 flex justify-between items-center">
        <Button onClick={() => navigate('/')}>Cancel</Button>
        <div>
          <Button onClick={() => navigate('/print')}>Upload</Button>
          <Button onClick={() => navigate('/print')}>Print</Button>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2 px-2 h-full">
        {/* Photo Viwer */}
        <div className="col-span-2 flex flex-col w-full rounded-lg shadow-xl">
          <div className="flex-1 my-6   overflow-scroll px-6">
            <div className="h-2">
              <DrawGallery />
              <StickerGallery />
            </div>
          </div>
        </div>

        <div className="col-span-8 w-full h-full flex justify-center items-center ">
          {/* Photo Editor */}
          <PhotoEditor
            photoIndex={allPhotos.findIndex(
              (photo) => photo.src === selectedPhoto!.src
            )}
            src={selectedPhoto!.src}
            stickers={selectedPhoto!.stickers}
          />

          {/* <div className="flex flex-col justify-center space-y-8">
            <button
              className="flex flex-col items-center outline-none"
              onClick={() => handleMenuSelect('draw')}
            >
              <div
                className={`bg-yellow-500 p-4 ${
                  menu === 'draw' && 'p-3 border-4 border-gray-900'
                } w-16 rounded-full`}
              >
                <BiPen size="100%" />
              </div>
              <h3 className="font-semibold">Draw</h3>
            </button>
            <button
              className="flex flex-col items-center outline-none"
              onClick={() => handleMenuSelect('sticker')}
            >
              <div
                className={`bg-yellow-500 p-4 ${
                  menu === 'sticker' && 'p-3 border-4 border-gray-900'
                } w-16 rounded-full`}
              >
                <BiCool size="100%" />
              </div>
              <h3 className="font-semibold">Sticker</h3>
            </button>
          </div> */}
        </div>
        {/* <div className="col-span-1 flex flex-col w-full rounded-lg shadow-xl">

        </div> */}
      </div>
    </div>
  );
}

export default Content;
