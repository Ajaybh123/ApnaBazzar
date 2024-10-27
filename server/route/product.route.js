const productRouter = require('express').Router();
const { createProduct, getAllRecords, getSingleRecords, deleteRecord } = require('../controllers/product.controller');
const upload  = require('../middlerware/fileUploader');
const { isAuthenticate } = require('../middlerware/isAuthenticate');

productRouter.post("/create-product",upload.single('pic'), createProduct);
productRouter.get("/get-all-product", getAllRecords);
productRouter.get("/get-single-product/:_id", getSingleRecords);
productRouter.delete("/delete-product/:_id", deleteRecord);

module.exports = productRouter;