import { Schema, model, type Document } from 'mongoose';
import { IItem } from './Item.js';

interface ICollection extends Document {
  title: string;
  description: string;
  image: string;
  items: IItem[];
}

const collectionSchema = new Schema<ICollection>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

const Collection = model<ICollection>('Collection', collectionSchema);

export { type ICollection, collectionSchema };

export default Collection;
