import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import {
  onTransfromEnd,
  SelectedPhotoInterface,
  StickerInteface,
} from '../interface';
import Sticker from './Sticker';
import balloon from '../../../../../public/stickers/balloon.png';

function PhotoEditor({
  index,
  src,
  stickers,
  onFinishDecorate,
}: SelectedPhotoInterface): JSX.Element {
  /* Stage size */
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* Add Image to canvas */
  const [image, setImage] = useState<CanvasImageSource | null>(null);
  const stageRef = useRef<any>(null);

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
    stageRef.current.hitOnDragEnabled = true;
  }, [src]);

  /* Stickers that on stage now */
  const [_stickers, setStickers] = useState<StickerInteface[]>(stickers);

  /* save stage */
  const handleOnDecorate = () => {
    onFinishDecorate!({ index: index!, stickers: _stickers });
  };

  /* save sticker properties */
  const handleTransfromEnd: onTransfromEnd = ({
    index,
    x,
    y,
    scale,
    rotation,
  }) => {
    const otherSticker = _stickers.filter(
      (sticker, stkIndex) => stkIndex !== index
    );

    const selectedSticker = _stickers.find(
      (sticker, stkIndex) => stkIndex === index
    );

    selectedSticker!.properties = {
      x,
      y,
      scale,
      rotation,
    };

    setStickers([...otherSticker, selectedSticker!]);
  };

  /* convert canvas to image (base64) */
  const toBase64 = () => {
    const image = stageRef.current.toDataURL();
    console.log(image);
  };

  /* handle on Stage click */
  const handleOnClick = () => {
    setIsSelected(null);
  };

  return (
    <>
      <Stage
        width={size.width}
        height={size.height}
        ref={stageRef}
        className="rounded-lg overflow-hidden shadow-lg"
        onMouseUp={handleOnDecorate}
      >
        <Layer>
          <KonvaImage
            image={image!}
            onClick={handleOnClick}
            onTap={handleOnClick}
          />
          {stickers.map(({ properties, src }, index) => (
            <Sticker
              src={src}
              index={index}
              key={index}
              properties={properties}
              isSelected={isSelected === index}
              onTransfromEnd={handleTransfromEnd}
              onSelect={() => setIsSelected(index)}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default PhotoEditor;
