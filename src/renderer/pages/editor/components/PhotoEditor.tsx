import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { v4 as uuid } from 'uuid';
import {
  onTransfromEnd,
  SelectedPhotoInterface,
  StickerInteface,
} from '../interface';
import Sticker from './Sticker';
import { useEditorContext } from '../context';

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
  };

  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        setStickers((prev) => [
          ...prev,
          {
            key: uuid(),
            src: selectSticker!,
            properties: {
              ...stageRef.current.getPointerPosition(),
              scale: 0.5,
            },
          },
        ]);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        <Layer>
          <KonvaImage
            image={image!}
            onClick={handleOnClick}
            onTap={handleOnClick}
          />
          {_stickers.map(({ properties, src, key }, index) => (
            <Sticker
              key={key}
              index={key}
              src={src}
              stageHeight={size.height}
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
