import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest) {
    try {
        const {userId } =await request.json();

        console.log("userID: ",userId);
        const user = await User.findById(userId).select("-password");
        if(!user){
            return NextResponse.json({
                message:"User not found"
            },{status:400})
        }
        return NextResponse.json({
            message:"User detail",
            status:1,
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({
            message:error.messasge
        },{status:500})
    }
}