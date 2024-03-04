import { NextResponse } from "next/server"

export async function GET() {
    try {
        const respone = NextResponse.json({
            message:"Logout successfully",
            status:1,
        });
        respone.cookies.set("token","",{
            httpOnly:true, expires: new Date(0)
        })

        return respone;
        
    } catch (error:any) {
        return NextResponse.json({
            message:error.message
        },{status:500})
    }
}