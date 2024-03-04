import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
   try {
    const requestBody = await request.json();
    const {email, password } = requestBody;
    
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({
            message: `User does not exists with ${email}. Please signup!`
        }, { status: 500 })
    }
    
    const comparePassword = await bcryptjs.compare(password, user.password);
    if(!comparePassword){
        return NextResponse.json({
            message: `Invalid password. Please try again!`
        }, { status: 500 })
    }
    // Send token in cookies
    const tokenData = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!,{
        expiresIn:"99d"
    })

    const response =  NextResponse.json({
        message: "Login up successfully",
        status: true
    })
    // Sending cookies along with response
    response.cookies.set("token",token,{
        httpOnly:true
    })
    return response;
} catch (error: any) {
    console.log("Singup Error: ", error);
    return NextResponse.json({
        message: "Server error"
    }, { status: 500 })
}
    
    
}