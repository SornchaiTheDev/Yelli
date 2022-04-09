import { useEffect, useState } from 'react';
import { useEditorContext } from 'renderer/context';
import { useThemeContext } from 'renderer/context/ThemeContext';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import BrushTrickness from './components/BrushTrickness';
import { BiUndo, BiRedo } from 'react-icons/bi';
import usewindow from 'renderer/hooks/usewindow';
import { useTranslation } from 'react-i18next';

function DrawGallery() {
  const [thickness, setThickness] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useColor('hex', '#000000');
  const [type, setType] = useState<'pen' | 'erasor'>('pen');
  const { setSelectedTool, handleUndo, handleRedo, canUndo, canRedo } =
    useEditorContext();
  const { width } = usewindow();
  const { theme } = useThemeContext();

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedTool({
      type,
      thickness: thickness,
      color: selectedColor.hex,
    });
  }, [type, thickness, selectedColor]);

  return (
    <div className="flex flex-col space-y-3 p-4 w-full border-gray-300 rounded-lg border-4">
      <div className="flex justify-center items-center w-full">
        <h1
          className="text-2xl font-bold"
          style={{
            color: theme.text.color,
          }}
        >
          {t('editor.draw')}
        </h1>
        <div className="flex justify-end items-center space-x-10">
          <div
            style={{
              color: canUndo ? theme.primary.color : theme.secondary.color,
            }}
            className="w-2/12 cursor-pointer"
            onClick={handleUndo}
          >
            <BiUndo size="100%" />
          </div>

          <div
            style={{
              color: canRedo ? theme.primary.color : theme.secondary.color,
            }}
            className="w-2/12 cursor-pointer"
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
    </div>
  );
}

export default DrawGallery;
