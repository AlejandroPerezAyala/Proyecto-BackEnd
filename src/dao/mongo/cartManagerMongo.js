import cartModel from "./models/cart.model.js"
import productModel from "./models/product.model.js"
import ticketModel from "./models/ticket.model.js"



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

    createTicket = async (ticket) => {
        const result = await ticketModel.create(ticket)

        return {status: 'Se creo el ticket correctamente', res: result}
    }

    purchaseProducts = async (cid, email) => {
        const cart = await cartModel.findOne({_id:cid}).lean().exec()
        if(!cart) return {status: error, res: 'no se encontro el carrito con ese ID'}

        const productosComprados = []
        const productosDevueltos = []
        let montoTotal = 0

        for (const productos of cart.productos){
            const product = await productModel.findOne(productos.producto)

            if(product.stock == 0){
                productosDevueltos.push(productos)
            } 

            if(product.stock >= productos.qty){
                product.stock -= productos.qty
                await productModel.updateOne({_id: product._id}, {$set: product})
                productosComprados.push({product: product._id, quantity: productos.qty})
                montoTotal += product.price * productos.qty
            } else {
                productosDevueltos.push(productos)
            }

            
        }   

        if(productosComprados.length > 0){
            const newTicket ={
                code: Math.floor(Math.random() * 1000),
                purchase_datetime: new Date(),
                amount: montoTotal,
                purchaser: email,
                products: productosComprados,
            }

            const ticket = await this.createTicket(newTicket)

            cart.productos = productosDevueltos

            const newCart = await cartModel.updateOne({_id: cid}, cart)
            const result = await ticketModel.findOne({_id:ticket.res._id}).lean().exec()

            return {
                status: 'Success',
                ticket: result,
                cart: cart
            }

        }


        

        
    }
}