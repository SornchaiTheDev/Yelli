import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
interface BigPhotoProps {
  path: string;
  onClick: () => void;
  selectedPhoto: string[];
}
import Select from './Select';
function BigPhoto({ path, onClick, selectedPhoto }: BigPhotoProps) {
  const [size, setSize] = useState({ width: 1470, height: 980 });
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSize({ width: img.width, height: img.height });
    };
    img.src = path;
  }, [path]);
  return (
    <div className="fixed flex justify-center items-center w-full h-full px-10  bg-[rgba(0,0,0,0.75)] z-10">
      <div className="absolute w-full h-full z-10" onClick={onClick}></div>
      <div className="flex flex-col justify-center items-center z-20 space-y-1 ">
        <div
          className="self-end w-8 text-white cursor-pointer"
          onClick={onClick}
        >
          <IoClose size="100%" />
        </div>
        <div className="bg-white overflow-hidden rounded-xl  shadow-xl">
          <img
            className="rounded-t-xl "
            style={{ width: size.width / 1.5, height: size.height / 1.5 }}
            src={path}
          />
          <div className="flex justify-end items-center w-full py-2 px-4">
            <div className="flex space-x-4">
              <button className="w-full px-6 py-3 rounded-full bg-yellow-500 font-bold">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="mt-4 border-2 w-1/2 px-4 py-2 rounded-lg text-xl font-bold">
        Next
      </button> */}
    </div>
  );
}

export default BigPhoto;
