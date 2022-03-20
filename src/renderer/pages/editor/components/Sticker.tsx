import { useRef } from 'react';
import { Transformer, Star } from 'react-konva';

function Sticker() {
  const transfromRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);

  const selected = () => {
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
        x={10}
        y={100}
        fill="gold"
        width={200}
        height={200}
        numPoints={5}
        innerRadius={50}
        outerRadius={100}
      />
      <Transformer
        borderEnabled={false}
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
