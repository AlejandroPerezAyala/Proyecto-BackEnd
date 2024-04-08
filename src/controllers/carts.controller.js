import { cartService } from "../services/index.js"
import { logger } from "../logger.js"



export const getCarts =  async (req, res) => {
    try{
        const carts = await cartService.getCarts()
        res.send(carts)

    } catch (err) {
        logger.error(err)
    }
}

export const getCartById = async (req, res) => {
    const id = req.params.cid
    const cart = await cartService.getCartById(id)
    res.send(cart)

}

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart()
        res.send(cart)
    } catch (err) {
        logger.error(err)
    }
}

export const addProductInCart = async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid

        const product = await cartService.addProductInCart(cid, pid)

        res.send(product)

    } catch (err) {
        logger.error(err)
    }
}

export const updateProductInCart = async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const update = req.body.qty

    const result = await cartService.updateProductInCart(cid, pid, update)

    res.send(result)
}

export const updateProductsInCart = async (req,res) => {
    const cid = req.params.cid
    
    const update = req.body

    const result = await cartService.updateProductsInCart(cid, update)

    res.send(result)
}

export const deleteProductInCart = async (req, res) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid

        const product = await cartService.deleteProductInCart(cid, pid)

        res.send(product)

    } catch (err) {
        logger.error(err)
    }
}

export const deleteAllProducts = async (req, res) => {
    const id = req.params.cid
    const cart = await cartService.deleteAllProducts(id)
    res.send(cart)
}

export const purchaseProducts = async (req, res) => {
    const id = req.params.cid
    const user = req.user
    res.json({payload: user})

    // const purchase = await cartService.purchaseProducts(id, email)

    // res.send(purchase)
}