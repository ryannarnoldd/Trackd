import type { IBook } from '../models/Collection.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: IBook[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number | null;
}
