import { Schema, model, type Document } from 'mongoose';

interface IItem extends Document {
    name: string | "Empty Item";
    description: string;
    price: number;
    condition: string;
    image: string;
}

const itemSchema = new Schema<IItem>({
    name: {
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
