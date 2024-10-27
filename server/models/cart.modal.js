const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is Mendatory"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is Mendatory"]
    }

})
const Cart = new mongoose.model('Cart', CartSchema)
module.exports = Cart