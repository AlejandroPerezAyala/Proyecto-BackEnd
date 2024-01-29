import config from "../config/config.js"
import mongoose from "mongoose"
import { opts } from "../config/commander.js"

export let Cart
export let Product
export let User


console.log('persistence with ' + opts.persistence)

if(opts.persistence === "MONGO"){
    await mongoose.connect(config.mongoURL, {dbName: config.mongoDBName})
    console.log("db connected")

    const {default: CartMongo} = await import ('./mongo/cart.mongo.js')
    const {default: ProductMongo} = await import ('./mongo/product.mongo.js')
    const {default: UserMongo} = await import ('./mongo/user.mongo.js')
    

    Cart = CartMongo
    Product = ProductMongo
    User = UserMongo
} else {
    console.log("Error al escoger la persistencia")
}