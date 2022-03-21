import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState, useEffect } from 'react';
import { Transformer, Image as KonvaImage } from 'react-konva';
import { StickerInteface } from '../interface';

type StickerProperties = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

function Sticker({
  index,
  isSelected,
  properties,
  src,
  onSelect,
  onTransfromEnd,
}: StickerInteface & {
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const transfromRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  // save sticker state
  const [StickerProperties, setStickerProperties] = useState<StickerProperties>(
    properties!
  );

  const handleImageInit = () => {
    const img = new Image();

    img.addEventListener('load', () => {
      setImg(img);
    });
    img.crossOrigin = 'Anonymous';
    img.src = src;
  };

  // set Stage size to image size
  useEffect(() => {
    handleImageInit();
  }, [src]);

  const selected = () => {
    onSelect();
    transfromRef.current.nodes([shapeRef.current]);
    transfromRef.current.getLayer().batchDraw();
  };

  const handleOnTransform = (e: KonvaEventObject<Event>) => {
    setStickerProperties({
      x: e.target.x(),
      y: e.target.y(),
      scale: e.target.scaleX(),
      rotation: e.target.rotation(),
    });
  };

  return (
    <>
      <KonvaImage
        image={img}
        draggable
        ref={shapeRef}
        onClick={selected}
        onTap={selected}
        onDragStart={selected}
        onTouchStart={selected}
        x={StickerProperties.x}
        y={StickerProperties.y}
        rotation={StickerProperties.rotation}
        scale={{ x: StickerProperties.scale, y: StickerProperties.scale }}
      />
      <Transformer
        rotateAnchorOffset={50}
        borderEnabled={false}
        anchorSize={25}
        anchorStroke="transparent"
        anchorCornerRadius={16}
        visible={isSelected}
        enabledAnchors={[
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ]}
        rotationSnaps={[0, 90, 180, 270]}
        ref={transfromRef}
        onTransform={handleOnTransform}
        onTransformEnd={() => onTransfromEnd!({ index, ...StickerProperties })}
      />
    </>
  );
}

export default Sticker;
