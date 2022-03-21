export interface StickerProperties {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export type onTransfromEnd = ({
  index,
  properties,
}: {
  index: number;
  properties: StickerProperties;
}) => void;

export interface StickerInteface {
  name?: string;
  src: string;
  properties?: StickerProperties;
  onTransfromEnd?: onTransfromEnd;
}

export type onFinishDecorateInterface = ({
  index,
  stickers,
}: {
  index: number;
  stickers: StickerInteface[];
}) => void;

export interface SelectedPhotoInterface {
  index?: number;
  src: string;
  stickers: StickerInteface[];
  onFinishDecorate?: onFinishDecorateInterface;
}
