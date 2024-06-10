import { Request } from 'express';
import Product from '../model/product.model';
import { productTypes } from '../types/products.type';

export class ProductsHandler {

    public async listProducts(req: Request): Promise<productTypes[]> {
        let query = {};
        if (req.params.id) {
            query = { number: req.params.id }
        }
        try {
            const products: productTypes[] = await Product.find(query);
            if (products.length > 0) {
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error, 'error');
            throw error;
        }
    }

    public async createProduct(req: Request): Promise<productTypes | string | null> {
        try {
            const isExist = await Product.findOne({ product_name: req.body.product_name });
            if (!isExist) {
                const newProductData: productTypes = {
                    product_name: req.body.product_name,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    number: req.body.number,
                };
                const newProduct = new Product(newProductData);
                const createdProduct = (await newProduct.save());
                return createdProduct;
            } else {
                let message: any = {message: 'Product already exists'}
                return message;
            }
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    public async updateProduct(req: Request): Promise<any> {
        try {
            const condition = { number: req.params.id };
           const updatedProduct: any = await Product.findOneAndUpdate(condition, req.body)
                if (!updatedProduct) {
                    return "Product not Found";
                }else{
                    return updatedProduct;
                }
        } catch (error) {
            console.log(error, 'error');
            throw error;
        }
    }

    
    public async deleteProduct(id: Number) {
        try{
                       const product: any = await Product.deleteOne({ number: id });
                       return product;
                } catch(error){
                    console.log(error,'error');
                    throw error;
                }
    }

}