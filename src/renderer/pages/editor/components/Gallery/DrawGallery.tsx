import { useEffect, useState, useRef } from 'react';
import { useEditorContext } from 'renderer/context';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import BrushTrickness from './components/BrushTrickness';

function DrawGallery() {
  const [thickness, setThickness] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useColor('hex', '#ffffff');
  const [toolType, setToolType] = useState<'pen' | 'eraser'>('pen');
  const { setSelectedTool } = useEditorContext();
  const sliderRef = useRef(null);

  useEffect(() => {
    setSelectedTool({
      type: toolType,
      thickness: thickness,
      color: selectedColor.hex,
    });
  }, [thickness, selectedColor]);

  return (
    <div className="flex flex-col space-y-10 p-4 w-full h-full ">
      <h1 className="text-4xl font-bold">Draw</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Thickness : {thickness}</h1>
      </div>
      <BrushTrickness
        thickness={thickness}
        color={selectedColor}
        selected={(size) => setThickness(size)}
      />

      <h1 className="text-xl font-semibold">Color</h1>
      <ColorPicker
        width={270}
        color={selectedColor}
        alpha
        hideHEX
        hideHSV
        hideRGB
        onChange={(e) => setSelectedColor(e)}
      />
      <div>

      </div>
    </div>
  );
}

export default DrawGallery;


