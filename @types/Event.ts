export interface PhotoI {
  src: string;
}
export interface EventI {
  amount: number;
  name: string;
  date : string;
  id: string;
  imgset: PhotoI[];
}
