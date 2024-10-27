const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "Username is Mendatory"],
        unique: true
    },
    email:{
        type:String,
        required: [true, "Email is Mendatory"],
        unique: true
    },
    password:{
        type:String,
        required: [true, "Password is Mendatory"],
    },
    role:{
        type:String,
        default:"user"
    },
    pic:{
        type:String,
        default:""
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const UserModal = new mongoose.model('User',UserSchema)
module.exports = UserModal