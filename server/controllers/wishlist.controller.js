const Wishlist = require("../models/wishlist.modal")
const Product = require("../models/product.modal")

const createWishlist = async(req, res) => {
    try {
        let userId = req.id;
        let product = await Product.findOne({ _id: req.body.product })
        if (product) {
            const WishlistItem = await Wishlist.findOne({ user: userId, product: product })
            if (!WishlistItem) {
                const data = new Wishlist(req.body)

                await data.save()
                let finalData = await Wishlist.findOne({ _id: data._id }).populate([
                    {
                        path: "user",
                        select: "username"
                    },
                    {
                        path: "product",
                        select: "name subcategory maincategory color size brand stock price description stockQuantity pic",
                    }
                ])
                if (data)
                    res.send({ success: "done", wishlist: finalData, message:"Product Added To Wishlist successfully" })
                else
                    res.send({ success: "Fail", message: "Product Not Found!" })
            } else {
                return res.status(400).send({ success: "Fail", message: "Product already exists in the Wishlist!" });
            }
        }
        else {
            res.send({ success: "Fail", message: "Product not exist!" })
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllRecords = async(req, res) => {
    try {
        const userId = req.id;
        const data = await Wishlist.find({ user: userId }).sort({ _id: -1 }).populate([
            {
                path: "user",
                select: "username"
            },
            {
                path: "product",
                select: "name subcategory maincategory color size brand basePrice discount finalPrice stockQuantity pic",

            }
        ])
        res.send({ success: "done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ success: "Fail", message: "Internal Server Error" })

    }

}

const deleteRecord = async(req, res) => {
    try {
        const userId = req.id
        const data = await Wishlist.findOne({ user: userId, _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ success: "Done", message: "Record is deleted successfully" })
        }
        else
            res.send({ success: "Fail", message: "Internal Server Error" })
    } catch (error) {
        res.status(500).send({ success: "Fail", message: "Internal Server Error" })
    }

}

module.exports = {
    createWishlist,
    getAllRecords,
    deleteRecord
}