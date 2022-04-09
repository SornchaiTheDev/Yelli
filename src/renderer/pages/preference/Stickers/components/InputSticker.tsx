import { DragEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface StickerInterface {
  src: string;
}
function InputSticker({
  onImport,
}: {
  onImport: (src: StickerInterface[]) => void;
}) {
  const [status, setStatus] = useState<string>('setting.stickers.initial');
  const { t } = useTranslation();
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
    if (!isImage && e.dataTransfer.files[0].type === '')
      window.electron.stickers
        .importDir(filePaths[0])
        .then((stickers: StickerInterface[]) => onImport(stickers));
    if (e.dataTransfer.files && isImage)
      window.electron.stickers
        .import(filePaths)
        .then((stickers: StickerInterface[]) => onImport(stickers));
    setStatus('setting.stickers.initial');
  };
  return (
    <div
      className="w-full h-36 border-2 border-dashed rounded-lg flex justify-center items-center"
      onDragOver={(e) => {
        e.preventDefault();
        setStatus('setting.stickers.drop');
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setStatus('setting.stickers.initial');
      }}
      onDrop={handleOnDrop}
      onClick={() => window.electron.files.choose('file').then(handleSelected)}
    >
      <h1 className="text-lg font-semibold text-gray-500">{t(status)}</h1>
    </div>
  );
}

export default InputSticker;
