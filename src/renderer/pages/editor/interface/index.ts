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
  src: string;
  onFinishDecorate?: onFinishDecorateInterface;
}
