import type { Collection } from './Collection.js';

export interface User {
  username: string;
  email: string;
  password: string;
  collections: Collection[];
}
