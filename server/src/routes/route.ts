import express, { Request, Response, Router } from 'express';
import {ProductsHandler} from '../service/products.service';
import {CartHandler} from '../service/cart.service';

import {productTypes, cartTypes} from '../types/products.type';

const router: Router = express.Router();
const productsHandler: ProductsHandler = new ProductsHandler();
const cartHandler: CartHandler = new CartHandler();

//Product management
router.get('/products', async (req: Request, res: Response) => {
    try {
        const products: productTypes[] = await productsHandler.listProducts(req);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const products: productTypes[] = await productsHandler.listProducts(req);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/products', async (req: Request, res: Response) => {
    try {
        const createdProduct = await productsHandler.createProduct(req);
        if(createdProduct == null){
        res.status(200).send({message:'Product already exists'});
        }else {
            console.log(createdProduct,'createdProduct');
            res.status(200).json(createdProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});


router.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const product= await productsHandler.updateProduct(req);
        if (product == null) {
            return res.status(404).send('Product not found');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

router.delete('/products/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
       const product = await productsHandler.deleteProduct(id);
       if(product){
        res.status(200).send('Deleted Successfully');
       }else{
        return res.status(404).send('Product not found');
       }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Cart
router.post('/addToCart', async (req: Request, res: Response) => {
    try {
        const cart: string | cartTypes = await cartHandler.addToCart(req);
        if (typeof cart === 'string') {
            res.status(404).json({ message: cart });
        } else {
            res.status(200).send({message: 'Cart Updated successfully', cart});
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

router.delete('/deleteItem/:id', async (req: Request, res: Response) => {
    try {
        const deleteProduct: string | cartTypes = await cartHandler.deleteFromCart(req);
        if(typeof deleteProduct === 'string'){
            res.status(404).json({ message: deleteProduct });
        }else{
            res.status(200).send({message: 'Product removed from cart', deleteProduct});
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

router.get('/getItem/:id', async (req: Request, res: Response) => {
    try {
        const cartItems = await cartHandler.getItem(req);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;