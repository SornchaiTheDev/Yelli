import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useWindow from 'renderer/hooks/useWindow';
import { watermarkInterface } from '../interface/';

function PhotoFrame({ src, size }: watermarkInterface) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindow();

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  /* create img element for KonvaImage */
  const handleImage = (path: string) => {
    const img = new Image();
    img.src = path;
    img.crossOrigin = 'Anonymous';
    return img;
  };

  useEffect(() => {
    if (containerRef.current !== null) {
      const { width } = containerRef.current?.getBoundingClientRect();
      setContainerSize({ width, height: (width * 2) / 3 });
    }
  }, [containerRef.current, width]);

  return (
    <div
      className="w-full shadow-lg rounded-lg overflow-hidden"
      style={{ height: containerSize.height }}
      ref={containerRef}
    >
      <Stage
        width={containerSize.width}
        height={(containerSize.width * 2) / 3}
        className="rounded-lg overflow-hidden"
      >
        <Layer>
          <KonvaImage
            image={handleImage('assets://placeholder.png')}
            width={containerSize.width}
            height={containerSize.height}
          />
          <KonvaImage
            image={handleImage(src)}
            width={containerSize.width}
            height={containerSize.width * (size.height / size.width)}
            y={
              containerSize.height -
              containerSize.width * (size.height / size.width)
            }
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default PhotoFrame;
