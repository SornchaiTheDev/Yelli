import Select from './Select';

function Photo({
  path,
  checked,
  isSelect,
  onClick,
}: {
  path: string;
  checked: boolean;
  isSelect?: boolean;
  photoSrc?: string;
  onClick: (path: string) => void;
}) {
  return (
    <div
      className="relative bg-gray-200 rounded-lg overflow-hidden select-none cursor-pointer"
      onClick={() => onClick(path)}
    >
      {isSelect && (
        <Select className="absolute top-2 right-2" checked={checked} />
      )}
      <img src={path} className="pointer-events-none" />
    </div>
  );
}

export default Photo;
