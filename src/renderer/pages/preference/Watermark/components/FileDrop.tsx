import { DragEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Banner {
  src: string;
  size: { width: number; type: string; height: number };
}

function FileDrop({ onImport }: { onImport: (banner: Banner) => void }) {
  const [status, setStatus] = useState<string>('setting.watermark.initial');
  const { t } = useTranslation();

  const handleSelected = ({ filePaths }: { filePaths: string[] }) => {
    if (filePaths) {
      window.electron.banner
        .import(filePaths[0])
        .then((banner: any) => onImport(banner));
    }
  };
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const filePaths = e.dataTransfer.files[0].path;
    const isImage = /image\//g.test(e.dataTransfer.files[0].type);

    if (isImage)
      window.electron.banner
        .import(filePaths)
        .then((banner: any) => onImport(banner));
    setStatus('setting.watermark.initial');
  };
  return (
    <div
      className="w-full h-36 border-2 border-dashed rounded-lg flex justify-center items-center"
      onDragOver={(e) => {
        e.preventDefault();
        setStatus('setting.watermark.drop');
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setStatus('setting.watermark.initial');
      }}
      onDrop={handleOnDrop}
      onClick={() =>
        window.electron.files.choose('file-single').then(handleSelected)
      }
    >
      <h1 className="text-lg font-semibold text-gray-500">{t(status)}</h1>
    </div>
  );
}

export default FileDrop;
