import { Router } from "express";
import  CartManager  from "../dao/managers/cartManagerMongo.js";

const router = Router()
const cartManager = new CartManager()

router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getCarts()
        res.send(carts)

    } catch (err) {
        res.status(500).send("Error al obtener los carritos" + err)
    }
})

router.get('/:cid', async (req, res) => {
    const id = req.params.cid
    const cart = await cartManager.getCartById(id)
    res.send(cart)

})

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (err) {
        res.status(500).send("Error al crear el carrito" + err)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid

        const product = await cartManager.addProductInCart(cid, pid)

        res.send(product)

    } catch (err) {
        res.status(500).send("Error al agregar producto al carrito" + err)
    }
})

router.put('/:cid/product/:pid', async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const update = req.body.qty

    const result = await cartManager.updateProductinCart(cid, pid, update)

    res.send(result)
})

router.put('/:cid', async (req,res) => {
    const cid = req.params.cid
    
    const update = req.body

    const result = await cartManager.updateProductsInCart(cid, update)

    res.send(result)
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid

        const product = await cartManager.deleteProductInCart(cid, pid)

        res.send(product)

    } catch (err) {
        res.status(500).send("Error al agregar producto al carrito" + err)
    }
})

router.delete('/:cid', async (req, res) => {
    const id = req.params.cid
    const cart = await cartManager.deleteAllProducts(id)
    res.send(cart)

})



export default router