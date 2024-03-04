import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { token , password, confirmPassword } = requestBody;

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return NextResponse.json({
                message: "Invalid token"
            }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword;

        await user.save();

        return NextResponse.json({
         message:`Password changed successfull, Please login`,
            status:1
        })
        
    } catch (error:any) {
        console.log("reset Error: ", error);
        return NextResponse.json({
            message: "Server error"
        }, { status: 500 })
    }
}