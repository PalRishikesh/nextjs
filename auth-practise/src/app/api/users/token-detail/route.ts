import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
        try {
            const userId = await getDataFromToken(request);
            console.log("userID: ",userId);
            return NextResponse.json({
                message:"User detail",
                status:1,
                data:userId
            })
        } catch (error:any) {
            return NextResponse.json({
                error:error.messasge
            },{status:400})
        }
}