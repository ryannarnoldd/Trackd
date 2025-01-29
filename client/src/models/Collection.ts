import type { Item } from './Item';

export interface Collection{
  collectionId: string;
  title: string;
  description: string;
  image: string;
  items: Item[];
}
