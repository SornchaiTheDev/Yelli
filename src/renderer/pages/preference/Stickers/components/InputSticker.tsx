interface StickerInterface {
  src: string;
}
function InputSticker({
  onImport,
}: {
  onImport: (src: StickerInterface[]) => void;
}) {
  const handleSelected = ({ filePaths }: { filePaths: string[] }) => {
    if (filePaths) {
      window.electron.stickers
        .import(filePaths)
        .then((stickers: StickerInterface[]) => onImport(stickers));
    }
  };

  return (
    <div
      className="w-full h-36 border-2 flex justify-center items-center"
      onClick={() => window.electron.files.choose('file').then(handleSelected)}
    >
      <h1>Click or Drop Sticker here</h1>
    </div>
  );
}

export default InputSticker;
