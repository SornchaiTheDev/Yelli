import BackBtn from 'renderer/components/BackBtn';
import Photo from './components/Photo';
import { BiCool } from 'react-icons/bi';
import { MdPhotoFilter } from 'react-icons/md';
import PhotoEditor from './components/PhotoEditor';
import Button from 'renderer/components/Button';
{
  /* <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" /> */
}

function Editor(): JSX.Element {
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
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
              <Photo path="https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
            </div>
          </div>
        </div>

        <div className="col-span-5 w-full h-full flex items-center space-x-5 px-5">
          {/* Photo Editor */}
          <PhotoEditor />
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
