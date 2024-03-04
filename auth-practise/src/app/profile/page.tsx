"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    
    const [userId, setUserId] = useState();

    const getUserDetail = async()=>{
        const userDetail = await axios.get("/api/users/token-detail");
        console.log("userDetail: ",userDetail);
        setUserId(userDetail.data.data);
        
    }
    useEffect(()=>{
        getUserDetail();
    },[])
    return ( <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
    <div className="rounded-lg bg-white p-8 text-center shadow-xl">
      <h1 className="mb-4 text-4xl font-bold"></h1>
      <p className="text-gray-600">This is Profile Page</p>
      <Link href="/" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go back to Home </Link>{" "}
      {
        userId ? <Link href={`/profile/${userId}`} className="mt-4 inline-block rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"> Go to Profile Detail </Link>
      :<></>
      }
    </div>
  </div>)
}