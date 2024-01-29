import mongoose from "mongoose";

const collection = 'users'

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    cart:{
        _id:false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    rol: {
        type:String, 
        default: "user"
    },
    password: String
})

const userModel = mongoose.model(collection, schema)

export default userModel