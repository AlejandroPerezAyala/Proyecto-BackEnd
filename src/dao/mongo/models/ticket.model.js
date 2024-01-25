import mongoose from "mongoose";

const collection = 'tickets'

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type:Date,
        default: Date.toString
    },
    amount: Number,
    purchaser: String,
    products: {
        type: [
            {
                _id: false,
                product: { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: Number,
            },
        ],
        default: [],
    }
})

schema.pre('findOne', function() {
    this.populate('products.product')
})

const ticketModel = mongoose.model(collection, schema)

export default ticketModel