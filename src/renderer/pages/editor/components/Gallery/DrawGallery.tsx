import { useEffect, useState, useRef } from 'react';
import { useEditorContext } from 'renderer/context';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import BrushTrickness from './components/BrushTrickness';
import { BiUndo, BiRedo } from 'react-icons/bi';

function DrawGallery() {
  const [thickness, setThickness] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useColor('hex', '#ffffff');
  const [toolType, setToolType] = useState<'pen' | 'eraser'>('pen');
  const { setSelectedTool } = useEditorContext();

  useEffect(() => {
    setSelectedTool({
      type: toolType,
      thickness: thickness,
      color: selectedColor.hex,
    });
  }, [thickness, selectedColor]);

  return (
    <div className="flex flex-col space-y-3 p-4 w-full">
      <div className="flex justify-center items-center w-full ">
        <h1 className="text-3xl font-bold">Draw</h1>
        <div className="flex justify-end items-center space-x-10">
          <div className="w-2/12">
            <BiUndo size="100%" />
          </div>
          <div className="w-2/12">
            <BiRedo size="100%" />
          </div>
        </div>
      </div>
      <BrushTrickness
        thickness={thickness}
        color={selectedColor}
        selected={(size) => setThickness(size)}
      />

      <h1 className="text-xl font-semibold">Color</h1>
      <ColorPicker
        width={300}
        height={150}
        color={selectedColor}
        alpha
        hideHEX
        hideHSV
        hideRGB
        onChange={(e) => setSelectedColor(e)}
      />
      <div></div>
    </div>
  );
}

export default DrawGallery;
