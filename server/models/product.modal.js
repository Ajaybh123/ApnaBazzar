const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Mendatory"],
    },
    maincategory: {
        type: String,
        required: [true, "Maincategory is Mendatory"]
    },
    subcategory: {
        type: String,
        required: [true, "Subcategory is Mendatory"]
    },
    brand: {
        type: String,
        required: [true, "Brand is Mendatory"]
    },
    color: {
        type: String,
        required: [true, "Color is Mendatory"],
    },
    size: {
        type: String,
        required: [true, "Size is Mendatory"],
    },
    price: {
        type: Number,
        required: [true, "BasePrice is Mendatory"],
    },
    stock: {
        type: Boolean,
        default: true
    },
    stockQuantity: {
        type: Number,
        required: [true, "Stock Quantity is Mendatory"],
    },
    description: {
        type: String,
        required: [true, "Discription is Mendatory"],
    },
    pic: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: true
    }
})
const Product = new mongoose.model('Product', ProductSchema)
module.exports = Product