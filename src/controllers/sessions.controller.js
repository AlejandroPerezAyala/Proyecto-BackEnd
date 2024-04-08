import { logger } from "../logger.js"


export const login = async (req, res) => {
    
    try {
        if(!req.user) return res.status(404).send("Credenciales invalidas")
        
        
        const {token} = req.user

        res.cookie('CoderCookie', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly:true
        }).redirect('/home/products')

    } catch (error) {
        logger.error(error)
    }

    
}


export const register = async (req, res) => {
    
    try {
        res.redirect("/home/login")
    } catch (error) {
        logger.error(error)
    }
    
    
}

export const logout = async (req,res) => {
    try {
        res.cookie("CoderCookie", "").redirect("/home/login")
    } catch (error) {
        logger.error(error) 
    }

    
}

export const github = async (req,res) => {
    try {
        req.session.user = req.user

        res.redirect("/home/products")
    } catch (error) {
        logger.error(error)
    }

}

export const google = async (req,res) => {
    try {

        if(!req.user) return res.status(404).send("Credenciales invalidas")

        const {token} = req.user

        res.cookie('CoderCookie', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly:true
        }).redirect('/home/products')
    } catch (error) {
        logger.error(error)
    }
}