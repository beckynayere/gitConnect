"use client";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    console.log("User exists");

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    console.log("Password is valid");

    // Check if TOKEN_SECRET exists
    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined in the environment variables');
      }

    // Prepare token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // Create token with a 1-day expiration
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    // Return response with the token set as an HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error: any) {
    console.error("Error during login: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
