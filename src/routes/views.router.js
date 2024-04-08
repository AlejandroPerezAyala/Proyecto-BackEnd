import { Router } from "express";
import passport from "passport";
import { auth, publicAccess, current } from "../middlewares/middlewares.js";
import { getCartById, getProducts, realTimeGetProducts, home, login, register, purchaseCart, forgotPassword } from "../controllers/views.controller.js";
import { getMockingProducts } from "../controllers/products.controller.js";

const router = Router()

router.get('/products', auth, passport.authenticate('jwt', {session: false}), getProducts)

router.get('/realtimeproducts', realTimeGetProducts)

router.get('/carts/:cid', getCartById)

router.get('/', publicAccess, home)

router.get('/login', publicAccess, login)

router.get('/register', publicAccess, register)

router.get('/:cid/purchase', passport.authenticate('jwt', {session: false}), purchaseCart)

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({status: 'success', payload: req.user})
})

router.get('/forgotpassword', forgotPassword)

export default router