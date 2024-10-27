const cartRouter = require('express').Router();
const { createCart, getAllRecords, deleteRecord } = require('../controllers/cart.controller');
const { isAuthenticate } = require('../middlerware/isAuthenticate');

cartRouter.post("/create-cart", isAuthenticate, createCart);
cartRouter.get("/get-all-cart", isAuthenticate, getAllRecords);
cartRouter.delete("/delete-cart/:_id", isAuthenticate, deleteRecord);

module.exports = cartRouter;