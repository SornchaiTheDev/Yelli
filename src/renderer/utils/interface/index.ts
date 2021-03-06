import { watermarkInterface } from 'renderer/pages/preference/Watermark/interface';
import { Theme } from 'renderer/utils/interface/theme';

declare global {
  interface Window {
    electron: any;
  }
}

export interface StickerProperties {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface SelectedPhotoInterface {
  src: string;
  watermark: watermarkInterface;
  onFinishDecorate?: onFinishDecorateInterface;
}

export type onTransfromEnd = ({
  stickerIndex,
  properties,
}: {
  stickerIndex: string;
  properties: StickerProperties;
}) => void;

export interface StickerInteface {
  key: string;
  name?: string;
  src: string;
  properties?: StickerProperties;
  onTransfromEnd?: onTransfromEnd;
}

export type onFinishDecorateInterface = ({
  thumbnail,
}: {
  thumbnail: string;
}) => void;

export interface PhotoInterface {
  src: string;
  thumbnail?: string;
  stickers: StickerInteface[];
  createdTime: Date;
  onFinishDecorate?: onFinishDecorateInterface;
}

export interface Tool {
  type: 'pen' | 'erasor';
  thickness: number;
  color?: string;
}

export interface Lines {
  key: string;
  points: number[];
  tool: Tool;
}

export interface EditorContext {
  selectedPhoto: PhotoInterface | null;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<PhotoInterface | null>>;
  onFinishDecorate: onFinishDecorateInterface;
  selectSticker: string | null;
  setSelectSticker: React.Dispatch<React.SetStateAction<string | null>>;
  lines: Lines[];
  setLines: React.Dispatch<React.SetStateAction<Lines[]>>;
  selectedTool: Tool;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>;
  handleDrawing: (lines: Lines) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  clearDrawing: () => void;
  canUndo: boolean;
  canRedo: boolean;
  stageRef: React.MutableRefObject<any>;
  _stickers: StickerInteface[];
  setStickers: React.Dispatch<React.SetStateAction<StickerInteface[]>>;
  handleOnStickerDrop: (e: any) => void;
  handleRemoveLine: (otherLines: Lines[]) => void;
  isPrinting: boolean;
  handlePrint: () => void;
  thumbDir: string | null;
  setThumbDir: React.Dispatch<React.SetStateAction<string | null>>;
}
