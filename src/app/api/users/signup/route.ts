import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from bcryptjs;
import { error } from "console";
import { hash } from "crypto";

connect ()


export async function Post (request:NextRequest){
    try{
       const reqBody =  await request.json()
       const {username, email, password} = reqBody 
       console.log(reqBody);

    //    chek if usr exsists
    const user = await User.findOne({email})
        if (user) {
            return NextResponse.json ({error: "User already exsistts"}, {status:500})
        }
        // hashedpassword
        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hashe
        (password, salt)

// cret new user
new User ({
    username,
    email,
    password:hashedpassword
})


    } catch  (error : any) {
        return NextResponse.json({ error: error.messag},
        { status : 500})

    }
    }