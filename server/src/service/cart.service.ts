import { Request } from 'express';
import Cart from '../model/cart.model';
import { productItemTypes, cartTypes } from '../types/products.type';

export class CartHandler {

     // add & update cart items and count in the cart
    public async addToCart(req: Request): Promise<cartTypes | string> {
        try {
            const userId = req.body.user_id;
            let message;
        if (!userId) {
            message = 'User ID is required'
            return message;
        }

        // Find the cart by user ID
        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
            cart = new Cart({ user_id: userId, products: [] });
        }
        const products = req.body.products;

        if (!products || !Array.isArray(products)) {
            message = 'Invalid products format'
            return message;
        }

        // Add or update products in the cart
        products.forEach((product) => {
            const existingProduct = cart.products.find(item => item.product_id === product.product_id);

            if (existingProduct) {
                // If the product already exists in the cart, update the count
                existingProduct.count = product.count;
            } else {
                // If the product does not exist, add it to the cart
                cart.products.push(product);
            }
        });

        // Save the updated cart to the database
        await cart.save();
        return cart;

        } catch (error) {
            console.log(error, 'error');
            throw error;
        }
    }

     // delete items in the cart
    public async deleteFromCart(req: Request): Promise<cartTypes | string> {
        try {
            const userId = req.params.id;
            const product_id = req.body.product_id;
            let message;
            if (!userId) {
                message = 'User ID is required';
                return message;
            }
    
            if (!product_id) {
                message = 'Product ID is required';
                return message;
            }
    
            let cart = await Cart.findOne({ user_id: userId });
    
            if (!cart) {
                message = 'Cart not found';
                return message;
            }
    
            const productIndex = cart.products.findIndex(item => item.product_id === product_id);
    
            if (productIndex === -1) {
                message = 'Product not found in cart';
                return message;
            }
    
            // Remove the product from the cart
            cart.products.splice(productIndex, 1);
    
            // Save the updated cart to the database
            await cart.save();
    
            return cart;
        } catch (error) {
            console.error(error, 'error');
            throw error;
        }
    }

    // get items in the cart
    public async getItem(req: Request): Promise<cartTypes[]> {
        try {
            const cartItems: cartTypes[] = await Cart.find({user_id: req.params.id});
            if (cartItems.length > 0) {
                return cartItems;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error, 'error');
            throw error;
        }
    }
}