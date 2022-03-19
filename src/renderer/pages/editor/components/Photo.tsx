function Photo({
  path,
  onClick,
  className,
}: {
  path: string;
  onClick?: (path: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-200 rounded-lg overflow-hidden select-none cursor-pointer flex-shrink-0 ${
        className !== undefined ? className : ''
      }`}
      // onClick={() => onClick!(path)}
    >
      <img src={path} className="pointer-events-none w-full h-full" />
    </div>
  );
}

export default Photo;
