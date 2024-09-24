import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


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
const newUser = new User ({
    username,
    email,
    password:hashedpassword
})
 const savedUser = await newUser.save()
 console.log(savedUser);

 return NextResponse.json({
    message:"User created successfully", 
    success:true,
    savedUser
    })


    } catch  (error : any) {
        return NextResponse.json({ error: error.messag},
        { status : 500})

    }
    }