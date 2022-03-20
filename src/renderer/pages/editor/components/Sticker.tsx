import { useRef, useState } from 'react';
import { Transformer, Star } from 'react-konva';
import { StickerInteface } from '../interface';

function Sticker({
  isSelected,
  x,
  y,
  scale,
  onSelect,
}: StickerInteface & { isSelected: boolean; onSelect: () => void }) {
  const transfromRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);

  const selected = () => {
    onSelect();
    transfromRef.current.nodes([shapeRef.current]);
    transfromRef.current.getLayer().batchDraw();
  };

  return (
    <>
      <Star
        draggable
        ref={shapeRef}
        onClick={selected}
        onTap={selected}
        x={x}
        y={y}
        scale={{ x: scale, y: scale }}
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
      />
    </>
  );
}

export default Sticker;
