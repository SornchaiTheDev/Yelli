import { DragEvent } from 'react';
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
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const filePaths = Array.from(e.dataTransfer.files).map((file) => file.path);
    const isImage = /image\//g.test(e.dataTransfer.files[0].type);
    if (e.dataTransfer.files && isImage)
      window.electron.stickers
        .import(filePaths)
        .then((stickers: StickerInterface[]) => onImport(stickers));
  };
  return (
    <div
      className="w-full h-36 border-2 flex justify-center items-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleOnDrop}
      onClick={() => window.electron.files.choose('file').then(handleSelected)}
    >
      <h1>Click or Drop Sticker here</h1>
    </div>
  );
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
