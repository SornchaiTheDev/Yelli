import { DragEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

function FileDrop({
  onImport,
  drop,
  fileType,
}: {
  onImport: (res?: string[]) => void;
  drop: 'stickers' | 'watermark';
  fileType: 'file-single' | 'file-multiple';
}) {
  const { t } = useTranslation();

  const [status, setStatus] = useState<string>(`setting.${drop}.initial`);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const isSupport = Array.from(e.dataTransfer.items).every((item) =>
      /image\/|dir/.test(
        item.type === ''
          ? drop === 'watermark'
            ? 'not-supported'
            : 'dir'
          : item.type
      )
    );

    if (!isSupport) {
      return setStatus(`setting.not_supported`);
    }

    return setStatus(`setting.${drop}.drop`);
  };

  const handleSelected = ({ filePaths }: { filePaths: string[] }) => {
    if (filePaths.length > 0) {
      window.electron.banner.import(filePaths[0]).then(() => onImport());
    }
  };
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setStatus(`setting.${drop}.initial`);
    const isSupport = Array.from(e.dataTransfer.items).every((item) =>
      /image\/|dir/.test(
        item.type === ''
          ? drop === 'watermark'
            ? 'not-supported'
            : 'dir'
          : item.type
      )
    );

    if (isSupport) {
      if (drop === 'watermark') {
        const filePaths = e.dataTransfer.files[0].path;
        window.electron.banner.import(filePaths).then(() => onImport());
      }

      if (drop === 'stickers') {
        let filesPath;
        Array.from(e.dataTransfer.items).forEach((item) => {
          if (item.getAsFile()?.type === '')
            return (filesPath = item.getAsFile()?.path.toString());
          return (filesPath = Array.from(e.dataTransfer.files).map(
            (file) => file.path
          ));
        });

        window.electron.stickers
          .import(filesPath)
          .then((res: string[]) => onImport(res));
      }
    }
  };
  return (
    <div
      className="w-full h-36 border-2 border-dashed rounded-lg flex justify-center items-center cursor-pointer"
      onDragOver={handleDragOver}
      onDragLeave={(e) => {
        e.preventDefault();
        setStatus(`setting.${drop}.initial`);
      }}
      onDrop={handleOnDrop}
      onClick={() =>
        window.electron.files.choose(fileType).then(handleSelected)
      }
    >
      <h1 className="text-lg font-semibold text-gray-500">{t(status)}</h1>
    </div>
  );
}

export default FileDrop;
