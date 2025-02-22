import { useState } from "react";
import { useAuth } from "../context/authcontext"
import { useNavigate } from "react-router"
import axiosinstance from "../api";
import toast from "react-hot-toast";


export default function Login(){
    const {setuser,settoken} = useAuth();
    const navigate = useNavigate();
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
   

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axiosinstance.post("/users/login", {email,password});
            
            setuser(data)
            settoken(data.token);
            localStorage.setItem("token", data.token)
            navigate("/");
             toast.success("Logged in successfully")
        } catch (error) {
            console.log("login failed", error);
            toast.error("Login failed")
        }
       
    
       
    }


    return(
        <>
        
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6"> Login</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
            <div>
                <label htmlFor="e" className="block text-gray-400 mb-1">Email</label>
                <input type="text" id="e" value={email} onChange={(e) => setemail(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
            </div>
           
           <div>
           <label htmlFor="p" className="block text-gray-400 mb-1">Password</label>
           <input type="password" value={password} id="p" onChange={(e) => setpassword(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
           </div>
         
            <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition">Login</button>

        </form>
        </div>
           

        </div>
        
        
        
        </>
    )
}