export interface StickerProperties {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export type onTransfromEnd = ({
  stickerIndex,
  properties,
}: {
  stickerIndex: number | 'drop';
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
  photoIndex,
  stickers,
  thumbnail,
}: {
  photoIndex: number;
  stickers: StickerInteface[];
  thumbnail?: string;
}) => void;

export interface PhotoInterface {
  src: string;
  thumbnail?: string;
  stickers: StickerInteface[];
  onFinishDecorate?: onFinishDecorateInterface;
  photoIndex?: number;
}

export interface SelectedPhotoInterface {
  photoIndex: number;
  src: string;
  stickers: StickerInteface[];
  onFinishDecorate?: onFinishDecorateInterface;
}

export interface Tool {
  thickness: number;
  color?: string;
}

export interface Lines {
  key: string;
  points: number[];
  tool: Tool;
}

export interface EditorContext {
  allPhotos: PhotoInterface[];
  setAllPhotos: React.Dispatch<React.SetStateAction<PhotoInterface[]>>;
  selectedPhoto: SelectedPhotoInterface | null;
  onFinishDecorate: onFinishDecorateInterface;
  selectSticker: string | null;
  setSelectSticker: React.Dispatch<React.SetStateAction<string | null>>;
  lines: Lines[];
  setLines: React.Dispatch<React.SetStateAction<Lines[]>>;
  handleSelectPhoto: ({
    src,
    index,
    stickers,
  }: {
    src: string;
    index: number;
    stickers: StickerInteface[];
  }) => void;
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
}
