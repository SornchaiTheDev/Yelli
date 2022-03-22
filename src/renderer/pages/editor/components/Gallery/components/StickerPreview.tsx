import { useState } from 'react';
import { useEditorContext } from '../../../../../context';

function StickerPreview({ sticker }: { sticker: string }) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { setSelectSticker } = useEditorContext();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <img
        src={sticker}
        className={isDragging ? 'opacity-0' : 'opacity-100'}
        onDragStart={() => {
          setIsDragging(true);
          setSelectSticker(sticker);
        }}
        onDragEnd={() => setIsDragging(false)}
      />
    </div>
  );
}

export default StickerPreview;
