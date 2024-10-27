const Product = require('../models/product.modal')

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        if(req.file){
            product.pic = req.file.path
        }
        await product.save()
        res.send({ success: "Done", product: product, message:"Product create successfully" })
    } catch (error) {
        console.log(error)
        const errorMessage = []
        error.keyValue ? errorMessage.push({ name: "Testimonial Already Exist" }) : ""
        error.errors?.name ? errorMessage.push({ name: error.errors.name.message }) : ""
        error.errors?.pic ? errorMessage.push({ pic: error.errors.pic.message }) : ""
        error.errors?.message ? errorMessage.push({ message: error.errors.message.message }) : ""
        errorMessage.length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" }) :
            res.status(500).send({ result: "Fail", reason: errorMessage })
    }

    
};

const getAllRecords = async (req, res) => {
    try {
        const data = await Product.find().sort({ _id: -1 })
        res.send({ success: "done", count: data.length, product: data })
    } catch (error) {
        res.status(500).send({ success: "Fail", message: "Internal Server Error" })

    }

}

const getSingleRecords = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Product.findOne({ _id })

        if (data)
            res.send({ success: "done", product: data })
        else
            res.send({ success: "Fail", message: "Internal Server Error" })
    } catch (error) {
        res.status(500).send({ success: "Fail", message: "Internal Server Error" })

    }

}

const deleteRecord = async(req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id })
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
    createProduct,
    getAllRecords,
    getSingleRecords,
    deleteRecord
}