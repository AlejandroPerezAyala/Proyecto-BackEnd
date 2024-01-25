import mongoose from "mongoose";

const collection = "carts"

const schema = new mongoose.Schema({
    productos: {
        type:[
            {
                _id: false,
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                qty: Number
            }
        ],
        default: []
    }
})

schema.pre('findOne', function() {
    this.populate('productos.producto')
})

const cartModel = mongoose.model(collection, schema);

export default cartModel