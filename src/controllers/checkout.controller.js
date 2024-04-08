import {MercadoPagoConfig, Preference} from "mercadopago";
import config from "../config/config.js";

const client = new MercadoPagoConfig({accessToken: config.AccessTokenMp})

export const createPreference = async (req, res) => {
    try {

        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS"
            }],
            back_urls: {
                success: "https://www.youtube.com",
                failure: "https://www.youtube.com",
                pending: "https://www.youtube.com"
            },
            auto_return: "approved"
        }

        const preference = new Preference(client)
        const result = await preference.create({body})

        console.log(result.id)

        res.json({id:result.id})

    } catch (error) {
        console.log(error)
        res.status(400).send("el error es: "+ error)
    }
}