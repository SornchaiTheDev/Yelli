import { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState } from 'react';
import { Transformer, Star } from 'react-konva';
import { StickerInteface } from '../interface';

function Sticker({
  index,
  isSelected,
  x,
  y,
  scale,
  rotation,
  onSelect,
  onTransfromEnd,
}: StickerInteface & {
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const transfromRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);
  // save sticker state
  const [properties, setProperties] = useState<StickerInteface>({
    x,
    y,
    scale,
    rotation,
  });

  const selected = () => {
    onSelect();
    transfromRef.current.nodes([shapeRef.current]);
    transfromRef.current.getLayer().batchDraw();
  };

  const handleOnTransform = (e: KonvaEventObject<Event>) => {
    setProperties({
      x: e.target.x(),
      y: e.target.y(),
      scale: e.target.scaleX(),
      rotation: e.target.rotation(),
    });
  };

  return (
    <>
      <Star
        draggable
        ref={shapeRef}
        onClick={selected}
        onTap={selected}
        onDragStart={selected}
        onTouchStart={selected}
        x={properties.x}
        y={properties.y}
        rotation={properties.rotation}
        scale={{ x: properties.scale, y: properties.scale }}
        fill="gold"
        width={200}
        height={200}
        numPoints={5}
        innerRadius={50}
        outerRadius={100}
      />
      <Transformer
        borderEnabled={false}
        anchorSize={25}
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
        onTransformEnd={() => onTransfromEnd!({ index, ...properties })}
      />
    </>
  );
}

export default Sticker;
