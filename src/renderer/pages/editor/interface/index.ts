export interface StickerInteface {
  x: number;
  y: number;
  scale: number;
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
