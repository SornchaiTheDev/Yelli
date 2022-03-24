import { useState, useRef, useEffect } from 'react';
import { useEditorContext } from '../../../../../context';

function StickerPreview({ sticker }: { sticker: string }) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { setSelectSticker, selectSticker, handleOnStickerDrop } =
    useEditorContext();

  const stickerRef = useRef<HTMLImageElement | null>(null);
  // const [isDrag, setIsDrag] = useState(false);
  const [stickerPos, setStickerPos] = useState({ x: 0, y: 0 });

  const startDragSticker = (e: any) => {
    let event = e;
    if (e.type === 'touchstart') event = e.touches[0];
    setIsDragging(true);
    setSelectSticker(sticker);
    const left = stickerRef.current!.offsetLeft -100 - event.clientX;
    const top = stickerRef.current!.offsetTop -100 - event.clientY;
    setStickerPos({ x: left, y: top });
  };

  const dragSticker = (e: any) => {
    let event = e;
    if (e.type === 'touchmove') event = e.touches[0];

    if (isDragging) {
      stickerRef.current!.style.left = event.clientX + stickerPos.x + 'px';
      stickerRef.current!.style.top = event.clientY + stickerPos.y + 'px';
    }
  };

  const stopDragSticker = (e: any) => {
    handleOnStickerDrop(e);
    setIsDragging(false);
    stickerRef.current!.style.removeProperty('left');
    stickerRef.current!.style.removeProperty('top');
    setStickerPos({ x: 0, y: 0 });
  };
  const offDragSticker = (e: any) => {
    setIsDragging(false);
    stickerRef.current!.style.removeProperty('left');
    stickerRef.current!.style.removeProperty('top');
    setStickerPos({ x: 0, y: 0 });
  };

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-lg">
        <img
          className="select-none"
          ref={stickerRef}
          src={sticker}
          onMouseDown={startDragSticker}
          onMouseMove={dragSticker}
          onMouseOut={stopDragSticker}
          onMouseUp={offDragSticker}
          onTouchStart={startDragSticker}
          onTouchMove={dragSticker}
          onTouchEnd={stopDragSticker}
          onDragStart={(e) => e.preventDefault()}
          style={{
            position: isDragging ? 'absolute' : 'static',
            zIndex: 999,
            offset: 10,
            width: isDragging ? 256 : '100%',
          }}
        />
      </div>
    </>
  );
}

export default StickerPreview;
