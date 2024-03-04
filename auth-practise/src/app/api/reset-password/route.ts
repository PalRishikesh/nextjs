import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { email } = requestBody;
        
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                message: `User does not exists with ${email}, Please try to signup`
            }, { status: 400 })   
        }

        if(process.env.SEND_EMAIL){
            const emailRespones = await sendEmail({userId: user._id, email, emailType:"RESET"})
        }
        return NextResponse.json({
            message:`Link send succesfully to ${email}, Please check email id`,
            status:1
        })
        
    } catch (error:any) {
        console.log("reset Error: ", error);
        return NextResponse.json({
            message: "Server error"
        }, { status: 500 })
    }
}