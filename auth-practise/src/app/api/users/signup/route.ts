import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { firstname, lastname, email, password } = requestBody;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({
                message: "User already exists with email, Please Signup with different email"
            }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        await sendEmail({userId:savedUser._id,email,emailType: "VERIFY"})
        return NextResponse.json({
            message: "Sign up successfully",
            status: true
        })
    } catch (error: any) {
        console.log("Singup Error: ", error);
        return NextResponse.json({
            message: "Server error"
        }, { status: 500 })
    }
}