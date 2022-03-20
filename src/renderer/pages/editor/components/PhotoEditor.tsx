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

  // set Stage size to iamge size
  useEffect(() => {
    handleImageInit();
    stageRef.current.hitOnDragEnabled = true;
  }, [src]);
  const [stickers, setStickers] = useState<StickerInteface[]>([]);
  const handleOnDecorate = () => {
    onFinishDecorate!({ index: index!, layers: stickers });
  };

  // convert canvas to image (base64)
  const toBase64 = () => {
    const image = stageRef.current.toDataURL();
    console.log(image);
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
          <KonvaImage image={image!} />
          <Sticker />
        </Layer>
      </Stage>
    </>
  );
}

export default PhotoEditor;
