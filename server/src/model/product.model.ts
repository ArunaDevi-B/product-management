import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProduct extends Document {
    product_name: string;
    quantity: number;
    price: number;
    number: number;
}

const ProductSchema: Schema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        unique: true,
        required: true,
    },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;