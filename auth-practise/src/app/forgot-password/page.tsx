"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import LoadingImage from "@/../public/loading.gif";

export default function ResetPasswordPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [user, setUser] = useState({
        token:"",
        password:"",
        confirmPassword:""

    });
    
    
    const redirectHomePage = ()=>{
        router.push("/login");
    }
    const sendLoginAPI = async()=>{
        try{
            setLoading(true);
            const passwordResponse = await axios.post("/api/forgot-password",user);
            const successMesssage = passwordResponse.data?.message || 'Password changed successfully' ;
            toast.success(successMesssage)

            setTimeout(() => {
                redirectHomePage();
            }, 1000);
        }
        catch(error:any){
            console.log("Forgot Password Error: ",error);
            const errorMessage = error.response.data;
            toast.error(errorMessage.message)
        }
        finally{
          setLoading(false);
        }
    }

    const onSubmitClick = async(e:any)=>{
        e.preventDefault();
        console.log("onSubmitClick: ", user);
        sendLoginAPI();
    }

    useEffect(()=>{
      const tokenData = window.location.search.split("=")[1];
      console.log("tokendata :", tokenData);
      setUser({...user,token:tokenData})
    },[])
    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            { 
                 loading ? <Image className="m-auto" src={LoadingImage} width={50} alt="Loading..."/> : 
                 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                 Log in to your account
                 </h2>

                }
            
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
               
    
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={(e)=> setUser({...user, password: e.target.value})}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e)=> setUser({...user, confirmPassword: e.target.value})}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                <button onClick={(e)=>onSubmitClick(e)}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  href="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                Sign up here
                </Link>
              </p>
            </div>
          </div>
        </>
      );
}