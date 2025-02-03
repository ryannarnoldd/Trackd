import type { Item } from './Item.js';

export interface Collection {
  // collectionId: string;
  title: string;
  description: string;
  image: string;
  items: Item[];
}
