export const current = (rol) => {
    return (req,res,next) => {
        if(req.session.user.rol == rol) {
            return next()
        }

        res.status(400).send("no autorizado")
    }
}

export const publicAccess = (req, res, next) => {
    if(req.session?.user) return res.redirect('/home/products')
    
    return next()
}

export const auth = (req, res, next) => {
    if(req.session?.user) return next()
    res.redirect('/home/login')
}