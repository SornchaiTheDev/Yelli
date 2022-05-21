import { Photo } from '@decor/Photo';

export type AlbumProps = {
  imgset: Photo[];
  name: string;
  amount: number;
  onClick: () => void;
};
