import { BiMask, BiPrinter } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import BackBtn from 'renderer/components/BackBtn';
function Options() {
  return (
    <>
      <BackBtn />
      <div className="flex flex-col space-y-20 justify-center items-center w-full h-screen">
        <h1 className="text-4xl font-bold">Tap to Choose</h1>
        <div className="flex justify-center items-center space-x-28">
          <Link
            to="/editor"
            className="flex flex-col justify-center items-center bg-yellow-500 w-48 h-48 p-10 rounded-full shadow-lg cursor-pointer"
          >
            <div className="w-12">
              <BiMask size="100%" />
            </div>
            <h2 className="text-xl font-bold">Edit Photo</h2>
          </Link>
          <div className="flex flex-col justify-center items-center bg-yellow-500 w-48 h-48 p-10 rounded-full shadow-lg cursor-pointer">
            <div className="w-12">
              <BiPrinter size="100%" />
            </div>
            <h2 className="text-xl font-bold">Print Photo</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Options;
