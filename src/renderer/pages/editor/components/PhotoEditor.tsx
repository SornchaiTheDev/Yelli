import { useState, useEffect, useRef, DragEvent, MouseEvent } from 'react';
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
  const { selectSticker, onFinishDecorate } = useEditorContext();
  const stageRef = useRef<any>(null);

  /* Stage size */
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* Add Image to canvas */
  const [image, setImage] = useState<CanvasImageSource | null>(null);

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
    handleOnClick();

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

  interface Lines {
    points: number[];
    tool: 'pen' | 'eraser';
  }

  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lines, setLines] = useState<Lines[] | []>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<globalThis.MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()!.getPointerPosition();
    setLines([...lines, { tool, points: [pos!.x, pos!.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<globalThis.MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) {
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

  return (
    <div onDrop={handleOnStickerDrop} onDragOver={(e) => e.preventDefault()}>
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
        className="rounded-lg overflow-hidden shadow-lg"
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <KonvaImage
            image={image!}
            onClick={handleOnClick}
            onTap={handleOnClick}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="rgba(0,0,0,.25)"
              strokeWidth={100}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
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
