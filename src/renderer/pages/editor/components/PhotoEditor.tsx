import { useState, useEffect, useRef, DragEvent } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import { v4 as uuid } from 'uuid';
import { onTransfromEnd, SelectedPhotoInterface } from '../interface';
import Sticker from './Sticker';
import { useEditorContext } from '../../../context';
import { KonvaEventObject } from 'konva/lib/Node';

function PhotoEditor({ src }: SelectedPhotoInterface): JSX.Element {
  const {
    selectSticker,
    onFinishDecorate,
    selectedTool,
    lines,
    setLines,
    handleDrawing,
    clearDrawing,
    stageRef,
    _stickers,
    setStickers,
    handleRemoveLine,
  } = useEditorContext();

  /* Add Image to canvas */
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  /* which sticker user selected */
  const [isSelected, setIsSelected] = useState<string | null>(null);

  /* handle stage size to image size */
  const handleImageInit = () => {
    const img = new Image();

    img.crossOrigin = 'Anonymous';
    img.src = src as string;
    setImage(img);
  };

  /* set Stage size to image size */
  useEffect(() => {
    handleImageInit();
    setStickers([]);
  }, [src]);

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
    onFinishDecorate!({
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
    const otherStickers = _stickers.filter(({ key }) => key !== isSelected!);
    setStickers(otherStickers);
    handleOnClick();
    onFinishDecorate!({
      thumbnail: toBase64(),
    });
  };

  const handleOnStickerDrop = (e: DragEvent<HTMLDivElement>) => {
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
    setIsSelected(currentSticker.key);
    setStickers(allStickers);
    setTimeout(() => {
      onFinishDecorate!({
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
    isDrawing.current = true;
    if (selectedTool.type !== 'erasor' || isSelected !== null) {
      const pos = e.target.getStage()!.getPointerPosition();
      handleDrawing({
        key: uuid(),
        tool: selectedTool,
        points: [pos!.x, pos!.y],
      });
    }
  };

  const handleMouseMove = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // no drawing - skipping
    if (
      !isDrawing.current ||
      selectedTool.type === 'erasor' ||
      isSelected !== null
    ) {
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
      thumbnail: toBase64(),
    });
  };

  const removeSelectedLine = (key: string) => {
    if (selectedTool.type === 'pen' || !isDrawing.current) return;
    const otherLines = lines.filter(({ key: lineKey }) => lineKey !== key);
    setLines(otherLines);
    handleRemoveLine(otherLines);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current !== null) {
      setContainerSize({
        width: containerRef.current.getBoundingClientRect().width,
        height: (containerRef.current.getBoundingClientRect().width * 2) / 3,
      });
    }
  }, [containerRef]);

  useEffect(() => {
    console.log(isDrawing.current);
  }, [isDrawing]);

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
      >
        <Layer>
          <KonvaImage
            image={image}
            onClick={handleOnClick}
            onTap={handleOnClick}
            width={containerSize.width}
            height={containerSize.height}
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
              isSelected={isSelected === key}
              onTransfromEnd={handleTransfromEnd}
              onSelect={() => setIsSelected(key)}
              handleDeleteSticker={handleDeleteSticker}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default PhotoEditor;
