import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Star, Image as KonvaImage } from 'react-konva';

function PhotoEditor() {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [image, setImage] = useState<CanvasImageSource | null>(null);
  const stageRef = useRef<any>(null);

  const handleImageInit = () => {
    const img = new Image();

    img.addEventListener('load', () => {
      const { width, height } = img;
      setSize({ width, height });
    });
    img.crossOrigin = 'Anonymous';
    img.src =
      'https://images.unsplash.com/photo-1575641248750-4b81f06e2360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
    setImage(img);
  };

  // set Stage size to iamge size
  useEffect(() => {
    handleImageInit();
  }, []);

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
      >
        <Layer>
          <KonvaImage image={image!} />
          <Star
            x={10}
            y={100}
            draggable
            fill="gold"
            width={200}
            height={200}
            numPoints={5}
            innerRadius={50}
            outerRadius={100}
          />
        </Layer>
      </Stage>
    </>
  );
}

export default PhotoEditor;
