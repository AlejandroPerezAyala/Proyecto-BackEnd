
export const login = async (req, res) => {
    
    if(!req.user) return res.status(404).send("Credenciales invalidas")
        
        
    const {token} = req.user

    res.cookie('CoderCookie', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly:true
    }).redirect('/home/products')
}


export const register = async (req, res) => {
    res.redirect("/home/login")
}

export const logout = async (req,res) => {
    res.cookie("CoderCookie", "").redirect("/home/login")
}

export const github = async (req,res) => {
    req.session.user = req.user

    res.redirect("/home/products")
}