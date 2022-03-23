import { useState, useEffect, useRef, DragEvent } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import { v4 as uuid } from 'uuid';
import {
  onTransfromEnd,
  SelectedPhotoInterface,
  StickerInteface,
} from '../interface';
import Sticker from './Sticker';
import { useEditorContext } from '../../../context';
import { KonvaEventObject } from 'konva/lib/Node';

function PhotoEditor({
  photoIndex,
  src,
  stickers,
}: SelectedPhotoInterface): JSX.Element {
  const {
    selectSticker,
    onFinishDecorate,
    selectedTool,
    lines,
    setLines,
    handleDrawing,
    clearDrawing,
  } = useEditorContext();
  const stageRef = useRef<any>(null);

  /* Stage size */
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* Add Image to canvas */
  // const [image, setImage] = useState<CanvasImageSource | null>(null);
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  /* sticker sample */
  const [isSelected, setIsSelected] = useState<number | null>(null);

  /* handle stage size to image size */
  const handleImageInit = () => {
    const img = new Image();

    img.addEventListener('load', () => {
      const { width, height } = img;
      setSize({ width, height });
    });
    img.crossOrigin = 'Anonymous';
    img.src = src as string;
    setImage(img);
  };

  /* set Stage size to image size */
  useEffect(() => {
    handleImageInit();
  }, [src]);

  /* Stickers that on stage now */
  const [_stickers, setStickers] = useState<StickerInteface[]>([]);

  /* Set Sticker to stage  */
  useEffect(() => {
    setStickers(stickers);
  }, [stickers]);

  /* save sticker properties */
  const handleTransfromEnd: onTransfromEnd = ({ stickerIndex, properties }) => {
    // handleOnClick();

    const newStickers = _stickers.map((sticker, index) => {
      if (index === stickerIndex) {
        return {
          ...sticker,
          properties,
        };
      }
      return sticker;
    });
    setStickers(newStickers);
    onFinishDecorate!({
      photoIndex,
      stickers: newStickers,
      thumbnail: toBase64(),
    });
  };

  /* convert canvas to image (base64) */
  const toBase64 = () => {
    const image = stageRef.current.toDataURL();

    return image;
  };

  /* handle on Stage click */
  const handleOnClick = () => {
    setIsSelected(null);
  };

  const handleDeleteSticker = () => {
    const otherStickers = _stickers.filter((_, index) => index !== isSelected!);
    setStickers(otherStickers);
    onFinishDecorate!({
      photoIndex,
      stickers: otherStickers,
      thumbnail: toBase64(),
    });
  };

  const handleOnStickerDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    stageRef.current.setPointersPositions(e);
    const properties = {
      ...stageRef.current.getPointerPosition(),
      scale: 0.5,
    };
    const currentSticker = {
      key: uuid(),
      src: selectSticker!,
      properties,
    };
    const allStickers = [..._stickers, currentSticker];
    setStickers(allStickers);
    setTimeout(() => {
      onFinishDecorate!({
        photoIndex,
        stickers: allStickers,
        thumbnail: toBase64(),
      });
    }, 500);
  };

  const isDrawing = useRef(false);
  useEffect(() => {
    clearDrawing();
  }, []);

  const handleMouseDown = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    isDrawing.current = isSelected === null;
    const pos = e.target.getStage()!.getPointerPosition();

    handleDrawing({
      key: uuid(),
      tool: selectedTool,
      points: [pos!.x, pos!.y],
    });
  };

  const handleMouseMove = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // no drawing - skipping
    if (!isDrawing.current || isSelected !== null) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage!.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point!.x, point!.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    onFinishDecorate!({
      photoIndex,
      stickers: _stickers,
      thumbnail: toBase64(),
    });
  };

  const handleOnStickerTouchDrop = (e: any) => {
    stageRef.current.setPointersPositions(e);
    const properties = {
      ...stageRef.current.getPointerPosition(),
      scale: 0.5,
    };
    const currentSticker = {
      key: uuid(),
      src: selectSticker!,
      properties,
    };
    const allStickers = [..._stickers, currentSticker];
    setStickers(allStickers);
    setTimeout(() => {
      onFinishDecorate!({
        photoIndex,
        stickers: allStickers,
        thumbnail: toBase64(),
      });
    }, 500);
  };

  return (
    <div
      onTouchEnd={handleOnStickerTouchDrop}
      onDrop={handleOnStickerDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
        className="rounded-lg overflow-hidden shadow-lg"
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <KonvaImage
            image={image}
            onClick={handleOnClick}
            onTap={handleOnClick}
          />
          {lines.map(({ points, tool, key }) => (
            <Line
              key={key}
              points={points}
              stroke={tool.color}
              strokeWidth={tool.thickness}
              tension={0.5}
              lineCap="round"
            />
          ))}
          {_stickers.map(({ properties, src, key }, index) => (
            <Sticker
              key={key}
              src={src}
              stickerIndex={index}
              properties={properties}
              isSelected={isSelected === index}
              onTransfromEnd={handleTransfromEnd}
              onSelect={() => setIsSelected(index)}
              handleDeleteSticker={handleDeleteSticker}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default PhotoEditor;
