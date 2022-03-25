import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useState, useRef, DragEvent } from 'react';
import { useEditorContext } from 'renderer/context';
import { v4 as uuid } from 'uuid';
import { toBase64 } from './toBase64';

interface HandleEvent {
  isSelected: string | null;
  setIsSelected: React.Dispatch<React.SetStateAction<string | null>>;
  handleOnClick: () => void;
  handleOnStickerDrop: (e: any) => void;
  handleDeleteSticker: () => void;
  handleMouseDown: (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => void;
  handleMouseMove: (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => void;
  handleMouseUp: () => void;
  removeSelectedLine: (key: string) => void;
}

function handleEvent(): HandleEvent {
  const {
    selectSticker,
    onFinishDecorate,
    selectedTool,
    lines,
    setLines,
    handleDrawing,
    clearDrawing,
    stageRef,
    _stickers,
    setStickers,
    handleRemoveLine,
  } = useEditorContext();

  /* which sticker user selected */
  const [isSelected, setIsSelected] = useState<string | null>(null);

  /* handle on Stage click */
  const handleOnClick = () => {
    setIsSelected(null);
  };

  const handleDeleteSticker = () => {
    const otherStickers = _stickers.filter(({ key }) => key !== isSelected!);
    setStickers(otherStickers);
    handleOnClick();
    onFinishDecorate!({
      thumbnail: toBase64(stageRef.current),
    });
  };

  const handleOnStickerDrop = (e: DragEvent<HTMLImageElement>) => {
    stageRef.current.setPointersPositions(e);
    const properties = {
      ...stageRef.current.getPointerPosition(),
      scale: 0.5,
    };
    const currentSticker = {
      key: uuid(),
      src: selectSticker!,
      properties,
    };
    const allStickers = [..._stickers, currentSticker];
    setIsSelected(currentSticker.key);
    setStickers(allStickers);
    setTimeout(() => {
      onFinishDecorate!({
        thumbnail: toBase64(stageRef.current),
      });
    }, 500);
  };

  const isDrawing = useRef(false);
  useEffect(() => {
    clearDrawing();
  }, []);

  const handleMouseDown = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    isDrawing.current = true;
    if (selectedTool.type !== 'erasor' || isSelected !== null) {
      const pos = e.target.getStage()!.getPointerPosition();
      handleDrawing({
        key: uuid(),
        tool: selectedTool,
        points: [pos!.x, pos!.y],
      });
    }
  };

  const handleMouseMove = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // no drawing - skipping
    if (
      !isDrawing.current ||
      selectedTool.type === 'erasor' ||
      isSelected !== null
    ) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage!.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point!.x, point!.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    onFinishDecorate!({
      thumbnail: toBase64(stageRef.current),
    });
  };

  const removeSelectedLine = (key: string) => {
    if (selectedTool.type === 'pen' || !isDrawing.current) return;
    const otherLines = lines.filter(({ key: lineKey }) => lineKey !== key);
    setLines(otherLines);
    handleRemoveLine(otherLines);
  };
  return {
    isSelected,
    setIsSelected,
    handleOnClick,
    handleOnStickerDrop,
    handleDeleteSticker,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    removeSelectedLine,
  };
}

export default handleEvent;
