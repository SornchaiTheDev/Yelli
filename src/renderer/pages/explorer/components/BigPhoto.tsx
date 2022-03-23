import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface BigPhotoProps {
  path: string;
  onClick: () => void;
}

function BigPhoto({ path, onClick }: BigPhotoProps) {
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
        <div className="relative bg-white overflow-hidden rounded-xl  shadow-xl">
          <img
            className="rounded-t-xl pointer-events-none"
            style={{ width: size.width / 1.05, height: size.height / 1.05 }}
            src={path}
          />
          <Link
            to="/editor"
            className="absolute bottom-2 right-2 px-6 py-3 rounded-full bg-yellow-500  font-bold"
          >
            Next
          </Link>
          {/* <div className="flex justify-end items-center w-full py-2 px-4">
            <div className="flex space-x-4">

            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BigPhoto;
