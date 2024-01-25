import config from "../config/config.js"
import mongoose from "mongoose"
import { opts } from "../config/commander.js"

export let Cart
export let Product


console.log('persistence with ' + opts.persistence)

if(opts.persistence === "MONGO"){
    await mongoose.connect(config.mongoURL, {dbName: config.mongoDBName})
    console.log("db connected")

    const {default: CartMongo} = await import ('./mongo/cartManagerMongo.js')
    const {default: ProductMongo} = await import ('./mongo/productManagerMongo.js')
    

    Cart = CartMongo
    Product = ProductMongo
} else {
    console.log("Error al escoger la persistencia")
}