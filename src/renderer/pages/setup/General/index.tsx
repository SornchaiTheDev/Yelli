/**
 *
 * todos
 * 1. get photos from location
 * 2. choose languages
 * 3. set quotas
 *
 *
 */
import { BsFolder, BsPrinter } from 'react-icons/bs';
function General() {
  return (
    <>
      <div className="flex flex-col w-3/4 space-y-4 px-4">
        <h1 className="text-md font-medium">Photos Location</h1>
        <div className="flex items-center w-full space-x-4">
          <input
            type="text"
            className="text-sm rounded-lg w-full"
            value="/Users/imdev/documents/photos"
          />
          <BsFolder />
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
          <div className="flex items-center space-x-4 bg-yellow-500 p-2 rounded-lg">
            <BsPrinter />
            <h1>DS-RX1</h1>
          </div>
          <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <BsPrinter />
            <h1>Epson L360</h1>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-white flex space-x-2 w-full px-4 py-4">
        <div className="bg-yellow-500 rounded-lg flex justify-center px-4 py-2">
          <h1 className="text-md font-medium">Save Changes</h1>
        </div>
        <div className="bg-gray-300 rounded-lg flex justify-center px-4 py-2">
          <h1 className="text-md font-medium">Cancel</h1>
        </div>
      </div>
    </>
  );
}

export default General;
