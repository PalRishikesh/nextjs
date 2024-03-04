"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SingleProfilePage({params}:any){
    const router = useRouter();
    const [userId, setUserId] = useState(params.id);
    const [user , setUser ] = useState();
    const [isUserAvailable, setUserAvailable]= useState(false);
    
    const getUserDetail = async()=>{
        const userDetail = await axios.post("/api/users/detail",{userId});
        console.log("userDetail: ",userDetail);
        setUserAvailable(true);
        setUser(userDetail.data.data);
        
    }

    const setLogOut = async()=>{
        const response = await axios.get("/api/users/logout");
        toast.success("Log out success")
        setTimeout(() => {
            redirectHomePage();
        }, 2000);
    }
    const redirectHomePage = ()=>{
        router.push("/login");
    }
    useEffect(()=>{
        getUserDetail();
    },[])
    return ( <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
    <div className="rounded-lg bg-white p-8 text-center shadow-xl">
      <h1 className="mb-4 text-4xl font-bold"></h1>
      <p className="text-gray-600">Profile Page</p>
      {
        isUserAvailable ? <>
        <p className="text-gray-900">First Name : {user.firstname}</p>
        <p className="text-gray-900">Last Name :  {user.lastname}</p>
        <p className="text-gray-900">Email :  {user.email}</p>
        </> :<></>
      }
      <Link href="/" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go back to Home </Link>{" "}
      <button onClick={setLogOut} className="mt-4 inline-block rounded bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"> Log out </button>{" "}

    </div>
  </div>)
}