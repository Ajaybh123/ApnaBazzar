const wishlistRouter = require('express').Router();
const { createWishlist, getAllRecords, deleteRecord } = require('../controllers/wishlist.controller');
const { isAuthenticate } = require('../middlerware/isAuthenticate');

wishlistRouter.post("/create-wishlist", isAuthenticate, createWishlist);
wishlistRouter.get("/get-all-wishlist", isAuthenticate, getAllRecords);
wishlistRouter.delete("/delete-wishlist/:_id", isAuthenticate, deleteRecord);

module.exports = wishlistRouter;