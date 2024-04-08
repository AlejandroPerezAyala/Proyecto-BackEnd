import { Router } from "express";
import passport from "passport";
import { login, register, logout, github, google } from "../controllers/sessions.controller.js";


const router = Router()

router.post('/login', passport.authenticate('login', {failureRedirect: '/home', session:false}), login)

router.post('/register', passport.authenticate('register', {failureRedirect: '/home', session: false}), register)

router.get('/logout', logout)

router.get('/github', passport.authenticate('github', {scope:['user:email'], session: false}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: "/home/login", session:false}), github)

router.get('/google', passport.authenticate('google', {scope:['profile','email']}))

router.get('/googlecallback', passport.authenticate('google', {failureRedirect: "/home/login", session:false}), google)

export default router