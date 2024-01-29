import { productService, cartService } from "../services/index.js";

 export const getProducts =  async (req, res) => {
    try{
        const limit = req.query?.limit ?? 10
        const page = req.query?.page ?? 1
        const sort = req.query?.sort
        const query = req.query?.query
        const user = req.user.user

        const products = await productService.getProducts(limit, page, sort, query)
        res.render('home',{
            style: 'style.css',
            products,
            user
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
}

export const realTimeGetProducts = async (req, res) => {
    try{
        const limit = parseInt(req.query?.limit)
        const products = await productService.getProducts(limit)
        res.render('realTimeProducts',{
            style: 'style.css',
            products
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
}

export const getCartById = async (req,res) => {
    try{
        const cid = req.params.cid

        const cart = await cartService.getCartById(cid)

        res.render('cart', {
            style: 'style.css',
            cart
        })


    } catch(error){
        res.status(500).send("Error al obtener el carrito" + err)
    }
}

export const home = async (req, res) => {
    res.redirect('/home/login')
}

export const register = async (req,res) =>{
    res.render('register', {
        style: 'style.css'
    })
}

export const login = async (req, res) => {
    res.render('login', {
        style: 'style.css'
    })
}

export const purchaseCart = async (req, res) => {
    const id = req.params.cid
    const {email} = req.user.user
    
    const {ticket, cart} = await cartService.purchaseProducts(id,email)

    
    console.log(ticket)

    res.render('ticket', {
        style: 'style.css',
        ticket,
        cart
    })
}