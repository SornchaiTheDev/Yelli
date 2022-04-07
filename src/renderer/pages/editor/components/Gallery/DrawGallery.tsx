import { useEffect, useState } from 'react';
import { useEditorContext } from 'renderer/context';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import BrushTrickness from './components/BrushTrickness';
import { BiUndo, BiRedo } from 'react-icons/bi';
import usewindow from 'renderer/hooks/usewindow';
import { useTranslation } from 'react-i18next';
import theme from '../../../../theme.json';
function DrawGallery() {
  const [thickness, setThickness] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useColor('hex', '#ffffff');
  const [type, setType] = useState<'pen' | 'erasor'>('pen');
  const { setSelectedTool, handleUndo, handleRedo, canUndo, canRedo } =
    useEditorContext();
  const { width, height } = usewindow();

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedTool({
      type,
      thickness: thickness,
      color: selectedColor.hex,
    });
  }, [type, thickness, selectedColor]);

  return (
    <div className="flex flex-col space-y-3 p-4 w-full ">
      <div className="flex justify-center items-center w-full ">
        <h1
          className="text-3xl font-bold"
          style={{
            color: theme.text,
          }}
        >
          {t('editor.draw')}
        </h1>
        <div className="flex justify-end items-center space-x-10">
          <div
            className={`w-2/12 cursor-pointer ${
              canUndo ? 'text-gray-900' : 'text-gray-400'
            }`}
            onClick={handleUndo}
          >
            <BiUndo size="100%" />
          </div>
          <div
            className={`w-2/12 cursor-pointer ${
              canRedo ? 'text-gray-900' : 'text-gray-400'
            }`}
            onClick={handleRedo}
          >
            <BiRedo size="100%" />
          </div>
        </div>
      </div>

      <BrushTrickness
        thickness={thickness}
        color={selectedColor}
        selected={(size) => {
          if (type === 'erasor') {
            setType('pen');
            setThickness(size);
          }
          setThickness(size);
        }}
      />

      <ColorPicker
        width={width / 7}
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
