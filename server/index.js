const express = require('express');
const userRouter = require('./route/user.route');
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors')
const productRouter = require('./route/product.route');
const cartRouter = require('./route/cart.route');
const wishlistRouter = require('./route/wishlist.route');
require("./dbConnection/db_connect");

app.use(express.static("./public"))
app.use("/public", express.static("./public"))
const corsOrigin = {
    origin: ["http://localhost:5173","http://localhost:8000"],
    credentials: true
}
app.use(cors(corsOrigin))

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/wishlist",wishlistRouter);

app.listen(8000,() => {
    console.log("server is running on http://localhost:8000");
})