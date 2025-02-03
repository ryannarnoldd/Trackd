import { Schema, model, type Document } from 'mongoose';

interface IItem extends Document {
    title: string;
    description: string;
    price: number;
    condition: string;
    image: string;
}

const itemSchema = new Schema<IItem>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    condition: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Item = model<IItem>('Item', itemSchema);

export { type IItem, itemSchema };

export default Item;
