import { Schema, model, type Document } from 'mongoose';
import { type IItem, itemSchema } from './Item.js';


interface ICollection extends Document {
  collectionId: string;
  title: string;
  description: string;
  image: string;
  items: IItem[];
}

const collectionSchema = new Schema<ICollection>({
  collectionId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  items: [itemSchema],
});

const Collection = model<ICollection>('Collection', collectionSchema);

export { type ICollection, collectionSchema };

export default Collection;
