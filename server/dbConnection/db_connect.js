const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/urbanbazzar")
.then(()=>{
    console.log("Database is connected")
})
.catch((error)=>{
    console.log(error)
})