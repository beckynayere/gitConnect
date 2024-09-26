// import { verify } from "crypto";
import mongoose from "mongoose";
// import { type } from "os";

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
        match: [/.+\@.+\..+/, "Please provide a valid email address"]
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
    
    forgotPasswordToken: {
        type: String,
        default: null,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
        default: null,
    },
    verifyToken: {
        type: String,
        default: null,
    },
    verifyTokenExpiry: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;