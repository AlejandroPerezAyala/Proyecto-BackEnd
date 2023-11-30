import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js"
import CartManager from "../dao/managers/cartManagerMongo.js"


const router = Router()
const productManager = new ProductManager()
const cartManager = new CartManager()

router.get('/products', async (req, res) => {
    try{
        const limit = req.query?.limit ?? 10
        const page = req.query?.page ?? 1
        const sort = req.query?.sort
        const query = req.query?.query
        const products = await productManager.getProducts(limit, page, sort, query)
        res.render('home',{
            style: 'style.css',
            products
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
})

router.get('/realtimeproducts', async (req, res) => {
    try{
        const limit = parseInt(req.query?.limit)
        const products = await productManager.getProducts(limit)
        res.render('realTimeProducts',{
            style: 'style.css',
            products
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
})

router.get('/carts/:cid', async (req,res) => {
    try{
        const cid = req.params.cid

        const cart = await cartManager.getCartById(cid)

        console.log(cart)

        res.render('cart', {
            style: 'style.css',
            cart
        })


    } catch(error){
        res.status(500).send("Error al obtener el carrito" + err)
    }
})


export default router