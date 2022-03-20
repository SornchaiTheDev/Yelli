import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { SelectedPhotoInterface, StickerInteface } from '../interface';
import Sticker from './Sticker';

function PhotoEditor({
  index,
  src,
  layers,
  onFinishDecorate,
}: SelectedPhotoInterface): JSX.Element {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* Add Image to canvas */
  const [image, setImage] = useState<CanvasImageSource | null>(null);
  const stageRef = useRef<any>(null);

  // sticker sample
  const [isSelected, setIsSelected] = useState<number | null>(null);

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

  // set Stage size to image size
  useEffect(() => {
    handleImageInit();
    stageRef.current.hitOnDragEnabled = true;
  }, [src]);

  const [stickers, setStickers] = useState<StickerInteface[]>([
    { x: 100, y: 100, scale: 1 },
    { x: 200, y: 100, scale: 1 },
    { x: 300, y: 100, scale: 1 },
  ]);

  const handleOnDecorate = () => {
    onFinishDecorate!({ index: index!, layers: stickers });
  };

  // convert canvas to image (base64)
  const toBase64 = () => {
    const image = stageRef.current.toDataURL();
    console.log(image);
  };

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
          {stickers.map(({ x, y, scale }, index) => (
            <Sticker
              key={index}
              scale={scale}
              x={x}
              y={y}
              isSelected={isSelected === index}
              onSelect={() => setIsSelected(index)}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default PhotoEditor;
