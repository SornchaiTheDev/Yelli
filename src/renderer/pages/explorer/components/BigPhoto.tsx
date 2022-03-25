import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface BigPhotoProps {
  path: string;
  onClick: () => void;
}

function BigPhoto({ path, onClick }: BigPhotoProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <div className="fixed flex justify-center items-center w-full h-full px-10  bg-[rgba(0,0,0,0.75)] z-10">
      <div className="absolute w-full h-full z-10" onClick={onClick}></div>
      <div className="flex flex-col justify-center items-center z-20 space-y-6">
        <div
          className="self-end w-8 text-white cursor-pointer"
          onClick={onClick}
        >
          <IoClose size="100%" />
        </div>

        <img
          ref={imageRef}
          className="relative rounded-xl pointer-events-none"
          src={path}
          style={{ width: '70%' }}
        />
        <Link
          to="/editor"
          className="w-1/4 px-6 py-3 rounded-full bg-yellow-500  font-bold text-center"
        >
          Next
        </Link>
      </div>
    </div>
  );
}

export default BigPhoto;
