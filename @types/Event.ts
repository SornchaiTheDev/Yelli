export interface PhotoI {
  src: string | null;
  id: string;
}
export interface EventI {
  amount?: number;
  name: string;
  date?: { _seconds?: number; _nanoseconds?: number };
  id: string;
  imgset?: PhotoI[];
}
