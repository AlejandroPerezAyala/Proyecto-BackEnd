import { logger } from "../logger.js"

export const current = (rol) => {
    return (req,res,next) => {
        if(req.user.rol == rol) {
            return next()
        }

        res.status(400).send("no autorizado")
    }
}

export const publicAccess = (req, res, next) => {
    if(req.cookies['CoderCookie']) return res.redirect('/home/products')
    
    return next()
}

export const auth = (req, res, next) => {
    if(req.cookies['CoderCookie']) return next()
    res.redirect('/home/login')
}

export const addLogger = (req, res, next) =>{
    req.logger = logger
    req.logger.http(`[${req.method}] ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}