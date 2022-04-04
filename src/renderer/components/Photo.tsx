import { BiPrinter } from 'react-icons/bi';
function Photo({
  path,
  onClick,
  className,
}: {
  path: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-200 rounded-lg overflow-hidden select-none flex-shrink-0 relative ${
        className !== undefined ? className : ''
      }`}
    >
      <div className="absolute flex justify-center items-center w-full h-full">
        <div
          className="w-48 h-48 flex flex-col justify-center items-center rounded-full p-10 bg-yellow-500 cursor-pointer"
          onClick={onClick}
        >
          <div className="w-3/4">
            <BiPrinter size="100%" />
          </div>
          <h1 className="text-2xl font-bold">Print</h1>
        </div>
      </div>
      <img src={path} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
