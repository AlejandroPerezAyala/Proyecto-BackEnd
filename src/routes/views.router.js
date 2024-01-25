import { Router } from "express";
import ProductManager from "../dao/mongo/productManagerMongo.js"
import CartManager from "../dao/mongo/cartManagerMongo.js"
import { cartService } from "../services/index.js";



const router = Router()
const productManager = new ProductManager()
const cartManager = new CartManager()


const publicAccess = (req, res, next) => {
    if(req.session?.user) return res.redirect('/home/products')
    
    return next()
}

const auth = (req, res, next) => {
    if(req.session?.user) return next()
    res.redirect('/home/login')
}

router.get('/products', auth, async (req, res) => {
    try{
        const limit = req.query?.limit ?? 10
        const page = req.query?.page ?? 1
        const sort = req.query?.sort
        const query = req.query?.query
        const user = req.session.user

        const products = await productManager.getProducts(limit, page, sort, query)
        res.render('home',{
            style: 'style.css',
            products,
            user
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

router.get('/', publicAccess, async (req, res) => {
    res.redirect('/home/login')
})

router.get('/login', publicAccess,async (req, res) => {
    res.render('login', {
        style: 'style.css'
    })
})

router.get('/register', publicAccess,async (req,res) =>{
    res.render('register', {
        style: 'style.css'
    })
})

router.get('/:cid/purchase', async (req, res) => {
    const id = req.params.cid
    const {email} = req.session.user
    
    const purchase = await cartService.purchaseProducts(id,email)

    console.log({purchase})
    //res.send(purchase)
})

export default router