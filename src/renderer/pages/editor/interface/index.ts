export type onTransfromEnd = ({
  x,
  y,
  scale,
  rotation,
  index,
}: StickerInteface & { index: number }) => void;

export interface StickerInteface {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  onTransfromEnd?: onTransfromEnd;
}

export type onFinishDecorateInterface = ({
  index,
  layers,
}: {
  index: number;
  layers: StickerInteface[];
}) => void;

export interface SelectedPhotoInterface {
  index?: number;
  src: string;
  layers?: StickerInteface[];
  onFinishDecorate?: onFinishDecorateInterface;
}
