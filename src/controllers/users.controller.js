import { userService } from "../services/index.js";
import Mail from "../modules/mail.module.js";
import { logger } from "../logger.js";

const mail = new Mail()

export const getUser = async (req, res) => {

    try {
        const {user} = req.user

        const result = await userService.getUser(user._id)

        res.send(result)
    } catch (error) {
        logger.error(error)
    }
    
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await userService.getUserByEmail(email)
    if(!user) res.status(400).send("El usuario no existe")

    const html = `<h2>Señor ${user.first_name} olvido su contraseña?</h2>
                  <p>Ingrese al siguiente link para poder cambiarla</p>
                  <a href="https://google.com">cambiar contraseña</a>`

    const result = mail.send(user, "CAMBIAR CONTRASEÑA", html)

    res.send(result)

}