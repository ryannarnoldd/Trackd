import type { Item } from './Item';

export interface User {
  username: string;
  email: string;
  password: string;
  items: Item[];
}
