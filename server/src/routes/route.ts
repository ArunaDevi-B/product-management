import express, { Request, Response, Router } from 'express';
import {ProductsHandler} from '../service/products.service';
import {productTypes} from '../types/products.type';

const router: Router = express.Router();
const productsHandler: ProductsHandler = new ProductsHandler();


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
        console.log(createdProduct,'createdProduct')
        res.status(200).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

router.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const product: any = await productsHandler.updateProduct(req);
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
       const product: any = await productsHandler.deleteProduct(id);
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

export default router;