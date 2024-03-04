import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { token } = await requestBody;
        console.log("request Body : ",requestBody);
        
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return NextResponse.json({
                message: "Invalid token"
            }, { status: 400 })
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message:"Email verified succesfully",
            success:true
        })

    }
    catch (error: any) {
        console.log("Singup Error: ", error);
        return NextResponse.json({
            message: "Server error"
        }, { status: 500 })

    }
}