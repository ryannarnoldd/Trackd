import type { IItem } from '../models/Item.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  // savedItems: IItem[] | null;
  isCorrectPassword(password: string): Promise<boolean>;
 // bookCount: number | null;
}
