import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:true,
        required: [true, "Please provide a username"],
    },
    email: {
        type:String,
        required: ["Please provide an email"],
        unique: true,
    },
    password:{
        type:String,
        required: ["Please provide a password"]
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date, 
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;