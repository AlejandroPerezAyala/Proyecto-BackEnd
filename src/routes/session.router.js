import { Router } from "express";
import passport from "passport";
import config from "../config/config.js";


const router = Router()

router.post('/login', passport.authenticate('login', {failureRedirect: '/home'}),async (req, res) => {
    
    if(!req.user) return res.status(404).send("Credenciales invalidas")
        
        
    req.session.user = req.user

    res.redirect("/home/products")
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/home'}),async (req, res) => {
    res.redirect("/home/login")
})

router.get('/logout', async (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send("error al hacer el logout" + err)

        res.redirect("/home/login")
    })
})

router.get('/github', passport.authenticate('github', {scope:['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: "/home/login"}), async (req,res) => {
    req.session.user = req.user

    res.redirect("/home/products")
})

export default router