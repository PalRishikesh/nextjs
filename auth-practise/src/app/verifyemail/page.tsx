"use client"

import { useState, useEffect } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function VerifyEmailPage(){

    const router = useRouter();
    const [token, setTokenData ] = useState("");

    const redirectHomePage = ()=>{
        router.push("/");
    }
    const verifyEmailAPI = async()=>{
        try{
            const verifyEmailResponse = await axios.post("/api/verify-email",{
                token
            })

            toast.success("Account verified Successfully. Please login")
            setTimeout(() => {
                redirectHomePage();
            }, 3000);

        }
        catch(error:any){
            console.log("Login Error: ",error);
            const errorMessage = error.response.data;
            toast.error(errorMessage.message) 
        }
    }

    useEffect(()=>{
        if(token.length > 0){
            verifyEmailAPI();
        }
    },[token])

    useEffect(()=>{
        const tokenQuery = window.location.search.split("=")[1].toString();
        console.log("tokenQuery: ",tokenQuery);
        setTokenData(tokenQuery || "");
    },[])
   

    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">Hey!</h1>
          <p className="text-gray-600">Please wait, we are verifying Your Account</p>
    </div>
      </div>
    )
}