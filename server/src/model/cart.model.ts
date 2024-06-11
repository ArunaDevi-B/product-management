import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProductItem {
    product_name: string;
    product_id: string;
    count: number;
}

interface ICart extends Document {
    user_id: string;
    products: IProductItem[];
}

const ProductItemSchema: Schema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

const CartSchema: Schema = new Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    products: {
        type: [ProductItemSchema],
        required: true,
    },
}, { timestamps: true });

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
