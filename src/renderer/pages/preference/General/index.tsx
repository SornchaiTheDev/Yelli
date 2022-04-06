/**
 *
 * todos
 * 1. get photos from location
 * 2. choose languages
 * 3. set quotas
 *
 *
 */
import React, { useState, useEffect } from 'react';
import { BsFolder, BsPrinter } from 'react-icons/bs';
import Store from '../../../store';
function General() {
  const [printers, setPrinters] = useState<[]>([]);
  const [photosDir, setPhotosDir] = useState<string | undefined>(undefined);
  const [remains, setRemains] = useState<string | undefined>(undefined);
  const [selectedPrinter, setSelectedPrinter] = useState<string | undefined>(
    undefined
  );
  const [language, setLanguage] = useState<string>('en');
  const store = new Store();

  const getPreference = () => {
    store.get('photosDir').then((res) => setPhotosDir(res));
    store.get('printer').then((res) => setSelectedPrinter(res));
    store.get('remains').then((res) => setRemains(res));
    store.get('language').then((res) => setLanguage(res));
  };

  useEffect(() => {
    window.electron
      .getPrinters()
      .then((printers: any) => setPrinters(printers))
      .catch((err: string) => console.error(err));
    getPreference();
  }, []);

  useEffect(() => {
    if (printers.length > 0 && selectedPrinter === undefined) {
      const selected: { displayName: string } = printers.filter(
        ({ isDefault }) => isDefault
      )[0];
      setSelectedPrinter(selected.displayName);
      store.set('printer', selected.displayName);
    }
  }, [printers]);

  const handlePhotosDirSelect = () => {
    window.electron.files
      .choose()
      .then(({ filePaths }: { filePaths: string[] }) => {
        const path = filePaths[0];
        setPhotosDir(path);
        store.set('photosDir', path);
      });
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang: string = e.target.value;
    setLanguage(lang);
    store.set('language', lang);
  };

  const handleRemains = (e: React.ChangeEvent<HTMLInputElement>) => {
    const remains: string = e.target.value;
    setRemains(remains);
    store.set('remains', remains);
  };
  return (
    <>
      <title>Preferences</title>
      <div className="flex flex-col w-3/4 space-y-4 px-4">
        <h1 className="text-md font-medium">Photos Location</h1>
        <div
          className="flex items-center w-full space-x-4 relative"
          onClick={handlePhotosDirSelect}
        >
          <input
            type="text"
            className="text-sm rounded-lg w-full caret-yellow-500"
            disabled
            value={photosDir}
          />
          <div className="absolute right-2">
            <BsFolder />
          </div>
        </div>
        <h1 className="text-md font-medium">Languages</h1>
        <select
          className="rounded-lg w-fit text-sm font-semibold bg-gray-50"
          onChange={handleLangChange}
          value={language}
        >
          <option value="th">ภาษาไทย</option>
          <option value="en">English</option>
        </select>
        <h1 className="text-md font-medium">Print Remains</h1>
        <div className="flex items-center w-fit space-x-4  relative">
          <input
            onChange={handleRemains}
            type="text"
            className="text-sm rounded-lg bg-gray-50 caret-yellow-500"
            value={remains}
          />
          <div className="absolute right-2">
            <BsPrinter />
          </div>
        </div>
        <h1 className="text-md font-medium">Printer</h1>
        <div className="grid grid-cols-3 gap-4">
          {printers.map(
            ({ displayName }: { displayName: string; isDefault: boolean }) => {
              return (
                <div
                  key={displayName}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer ${
                    selectedPrinter === displayName
                      ? 'bg-yellow-500'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedPrinter(displayName);
                    store.set('printer', displayName);
                  }}
                >
                  <div>
                    <BsPrinter className="block" />
                  </div>
                  <h1>{displayName}</h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default General;