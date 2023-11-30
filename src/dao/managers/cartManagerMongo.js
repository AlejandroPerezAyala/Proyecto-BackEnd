import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"



export default class CartManager {

    createCart = async () => {
        try{

            const cart = {
                productos: []
            }

            const result = await cartModel.create(cart)
            return {status:'Se creo el carrito correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    getCarts = async () => {
        try{
            const data = await cartModel.find()
            return data
        } catch (error) {
            return error
        }
    }

    getCartById = async (cid) => {
        try{
            const data = await cartModel.findOne({_id:cid}).lean().exec()
            return data
        } catch (error) {
            return error
        }
    }

    addProductInCart = async (cid, pid) => {
        try{ 
            const carrito = await cartModel.findOne({_id:cid})
            const prod = await productModel.findOne({_id:pid})
           
            const product = carrito.productos.find(p => p.producto._id == pid)

            if(!product) {
                carrito.productos.push({producto: pid, qty: 1})
            } else {
                product.qty ++
            }

            const result = await cartModel.updateOne({_id: cid}, carrito)
            return {status:'Se agrego el producto correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    deleteProductInCart = async (cid, pid) => {
        try{ 
            const carrito = await cartModel.findOne({_id:cid})
            const prod = await productModel.findOne({_id:pid})
           
            const productos = carrito.productos.filter(p => p.producto._id != pid)

            console.log(productos)

            carrito.productos = productos

            const result = await cartModel.updateOne({_id: cid}, carrito)
            return {status:'Se elimino el producto correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    deleteAllProducts = async (cid) => {
        try{ 
            const carrito = await cartModel.findOne({_id:cid})
                                   
            carrito.productos = []

            const result = await cartModel.updateOne({_id: cid}, carrito)
            return {status:'Se eliminaron los productos correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    updateProductInCart = async(cid, pid, update) => {
        try{ 
            const carrito = await cartModel.findOne({_id:cid})
            const prod = await productModel.findOne({_id:pid})
           
            const product = carrito.productos.find(p => p.producto._id == pid)

            product.qty = update

            const result = await cartModel.updateOne({_id: cid}, carrito)

           
            return {status:'Se modifico la cantidad del producto correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }

    updateProductsInCart = async (cid, update) => {
        try{ 
            const carrito = await cartModel.findOne({_id:cid})
                                   
            carrito.productos = update

            const result = await cartModel.updateOne({_id: cid}, carrito)
            return {status:'Se modifico el array de productos correctamente',
                    res: result}
        } catch (error) {
            return error
        }
    }
}