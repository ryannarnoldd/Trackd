import type { ICollection } from '../models/Collection.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  collections: ICollection[] | [];
  isCorrectPassword(password: string): Promise<boolean>;
 // bookCount: number | null;
}