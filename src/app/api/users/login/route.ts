"use client";

import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { console } from "inspector";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        console.log("user exsists")
        // hash password
        // const salt = await bcryptjs.genSalt(10)
        // const hashedPassword = await bcryptjs.hash(password, salt)

        const validPassword = await bcryptjs.compare (password, user.password)
        if(!validPassword){
            return NextResponse.json({ error: "Invalid Password"}, {status : 400})
        }
        console.log(user );
        // token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // crate token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "Id"})
        const response = NextResponse.json ({
            message: "Login successfully",
            success:"true",
        })
        response.cookies.set("token", token,{
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
    