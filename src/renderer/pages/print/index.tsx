import { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import Photo from 'renderer/components/Photo';
import { useEditorContext } from 'renderer/context';
import { v1 as uuid } from 'uuid';
function Print() {
  const { selectedPhoto } = useEditorContext();

  const photoName = uuid().slice(0, 8) + selectedPhoto?.src.slice(-4);

  useEffect(() => {
    // console.log(photoName);
    window.electron.print(selectedPhoto, photoName);
  }, []);

  return (
    <div className="flex w-full h-screen justify-around items-center ">
      <div className="flex flex-col justify-center items-center space-y-6 ">
        <h1 className="text-4xl font-bold">Your Photos is now printing</h1>
        <h2 className="text-xl">
          you can download your photos at the qrcode below
        </h2>
        <QRCode value="https://sornchaithedev.com" size={300} />
        <h4 className="text-lg">or</h4>
        <div className="px-4 py-2 border-2">
          <h3 className="text-2xl">https://pip.pics/</h3>
        </div>
        <Link
          to="/"
          className="bg-yellow-500 w-full text-center py-4 text-xl font-bold rounded-lg"
        >
          Close
        </Link>
      </div>
      <div className="w-1/2">
        <Photo
          className="drop-shadow-xl"
          path={selectedPhoto!.thumbnail as string}
        />
      </div>
    </div>
  );
}

export default Print;
