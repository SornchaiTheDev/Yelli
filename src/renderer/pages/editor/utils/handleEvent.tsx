import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useState, useRef, DragEvent } from 'react';
import { useEditorContext } from 'renderer/context';
import { v4 as uuid } from 'uuid';

interface HandleEvent {
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

  const handleDeleteSticker = () => {
    const otherStickers = _stickers.filter(({ key }) => key !== selectSticker!);
    setStickers(otherStickers);
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
    setStickers(allStickers);
  };

  const isDrawing = useRef(false);
  useEffect(() => {
    clearDrawing();
  }, []);

  const handleMouseDown = (
    e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    isDrawing.current = true;
    if (selectSticker !== null) return;
    if (selectedTool.type !== 'erasor') {
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
      selectSticker !== null
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
  };

  const removeSelectedLine = (key: string) => {
    if (selectedTool.type === 'pen' || !isDrawing.current) return;
    const otherLines = lines.filter(({ key: lineKey }) => lineKey !== key);
    setLines(otherLines);
    handleRemoveLine(otherLines);
  };
  return {
    handleOnStickerDrop,
    handleDeleteSticker,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    removeSelectedLine,
  };
}

export default handleEvent;