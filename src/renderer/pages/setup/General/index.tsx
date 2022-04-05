/**
 *
 * todos
 * 1. get photos from location
 * 2. choose languages
 * 3. set quotas
 *
 *
 */
import { useState, useEffect } from 'react';
import { BsFolder, BsPrinter } from 'react-icons/bs';
function General() {
  const [printers, setPrinters] = useState([]);
  const [photosDir, setPhotosDir] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');

  useEffect(() => {
    window.electron
      .getPrinters()
      .then((printers: any) => setPrinters(printers));
  }, []);

  const handlePhotosDirSelect = () => {
    window.electron.files
      .choose()
      .then(({ filePaths }: { filePaths: string[] }) => {
        setPhotosDir(filePaths[0]);
      });
  };
  return (
    <>
      <div className="flex flex-col w-3/4 space-y-4 px-4 mb-24">
        <h1 className="text-md font-medium">Photos Location</h1>
        <div className="flex items-center w-full space-x-4">
          <input
            type="text"
            className="text-sm rounded-lg w-full"
            onChange={(e) => setPhotosDir(e.target.value)}
            value={photosDir}
          />
          <BsFolder onClick={handlePhotosDirSelect} />
        </div>
        <h1 className="text-md font-medium">Languages</h1>
        <select className="rounded-lg w-fit">
          <option>ภาษาไทย</option>
          <option selected>English</option>
        </select>
        <h1 className="text-md font-medium">Quotas</h1>
        <div className="flex items-center w-full space-x-4">
          <input
            type="number"
            className="text-sm rounded-lg w-fit"
            value="100"
          />
          <BsPrinter />
        </div>
        <h1 className="text-md font-medium">Printer</h1>
        <div className="grid grid-cols-3 gap-4">
          {printers.map(
            ({
              displayName,
              isDefault,
            }: {
              displayName: string;
              isDefault: boolean;
            }) => (
              <div
                className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                  isDefault ? 'bg-yellow-500' : 'hover:bg-gray-200'
                }`}
              >
                <div>
                  <BsPrinter className="block" />
                </div>
                <h1>{displayName}</h1>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default General;
