"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    
    
    const redirectHomePage = ()=>{
        router.push("/login");
    }
    const sendResetLinkAPI = async()=>{
        try{
            
            const signupResponse = await axios.post("/api/reset-password",{email});
            // console.log("signupResponse: ",signupResponse.data)
            const successMesssage = signupResponse.data?.message || 'Link send succesfully, Please check email' ;
            toast.success(successMesssage)
        }
        catch(error:any){
            console.log("Rest Error: ",error);
            const errorMessage = error.response.data;
            toast.error(errorMessage.message)
        }
    }

    const onSubmitClick = async(e:any)=>{
        e.preventDefault();
        sendResetLinkAPI();
    }

    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset password
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
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
                    Send link 
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