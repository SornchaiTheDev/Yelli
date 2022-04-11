import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import {
  onTransfromEnd,
  SelectedPhotoInterface,
} from 'renderer/utils/interface';
import Sticker from './Sticker';
import { useEditorContext } from '../../../context';
import handleEvent from '../utils/handleEvent';
import _bannerPath from '../../../../../public/banner.png';

function PhotoEditor({ src, banner }: SelectedPhotoInterface): JSX.Element {
  const {
    selectSticker,
    lines,
    stageRef,
    _stickers,
    setStickers,
    setSelectSticker,
  } = useEditorContext();
  const {
    handleDeleteSticker,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleOnStickerDrop,
    removeSelectedLine,
  } = handleEvent();

  /* Add Image to canvas */
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [_banner, _setBanner] = useState<HTMLImageElement | undefined>(
    undefined
  );
  const { isPrinting } = useEditorContext();

  /* Container Size use to set Stage and KonvaImage size */
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  /* create img element for KonvaImage */
  const handleImage = (path: string) => {
    const img = new Image();
    img.src = path;
    return img;
  };

  /* set Stage size to image size */
  useEffect(() => {
    setImage(handleImage(src));
    _setBanner(handleImage(banner.src));
    setStickers([]);
  }, [src,banner]);

  /* save sticker properties */
  const handleTransfromEnd: onTransfromEnd = ({ stickerIndex, properties }) => {
    const newStickers = _stickers.map((sticker) => {
      if (sticker.key === stickerIndex) {
        return {
          ...sticker,
          properties,
        };
      }
      return sticker;
    });
    setStickers(newStickers);
  };

  useEffect(() => {
    if (containerRef.current !== null) {
      setContainerSize({
        width: containerRef.current.getBoundingClientRect().width,
        height: (containerRef.current.getBoundingClientRect().width * 2) / 3,
      });
      console.log(containerRef.current.getBoundingClientRect().width);
      console.log(containerRef.current.getBoundingClientRect().height);
    }
  }, [containerRef.current]);

  return (
    <div
      onDrop={handleOnStickerDrop}
      className="w-full flex justify-center items-center"
      onDragOver={(e) => e.preventDefault()}
      ref={containerRef}
    >
      <Stage
        width={containerSize.width}
        height={containerSize.height}
        className="rounded-lg overflow-hidden shadow-lg"
        ref={stageRef}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Layer>
          <KonvaImage
            image={image}
            onClick={() => setSelectSticker(null)}
            onTap={() => setSelectSticker(null)}
            width={containerSize.width}
            height={containerSize.height}
          />
          <KonvaImage
            image={_banner}
            width={containerSize.width}
            height={
              containerSize.width * (banner.size.height / banner.size.width)
            }
            y={
              containerSize.height -
              containerSize.width * (banner.size.height / banner.size.width)
            }
          />
          {lines.map(({ points, tool, key }) => (
            <Line
              key={key}
              points={points}
              stroke={tool.color}
              strokeWidth={tool.thickness}
              tension={0.5}
              lineCap="round"
              onMouseEnter={() => removeSelectedLine(key)}
              onTouchMove={() => removeSelectedLine(key)}
            />
          ))}

          {_stickers.map(({ properties, src, key }) => (
            <Sticker
              key={key}
              src={src}
              stickerIndex={key}
              properties={properties}
              draggable={!isPrinting}
              isSelected={selectSticker === key && !isPrinting}
              onTransfromEnd={handleTransfromEnd}
              onSelect={() => setSelectSticker(key)}
              handleDeleteSticker={handleDeleteSticker}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default PhotoEditor;
