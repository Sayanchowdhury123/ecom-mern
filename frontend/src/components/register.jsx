import { useState } from "react";
import { useAuth } from "../context/authcontext"
import { useNavigate } from "react-router";
import axiosinstance from "../api";
import toast from "react-hot-toast";


export default function Register() {
    //  const {register} = useAuth();
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");


    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosinstance.post("/users/register", { name, email, password })
            console.log("resgistration successful", res.data);
            navigate("/login");
            toast.success("Reistration successful")
           
        } catch (error) {
             
            toast.error("Registration failed")
        }

    }


    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                    <form onSubmit={handlesubmit} className="space-y-4">
                      <div>
                        <label htmlFor="n" className="block text-gray-400 mb-1">Name</label>
                        <input type="text" id="n" value={name} onChange={(e) => setname(e.target.value)} required  className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                      </div>
                      

                      <div>
                        <label htmlFor="e" className="block text-gray-400 mb-1">Email</label>
                        <input type="text" id="e" value={email} onChange={(e) => setemail(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500" />
                      </div>
                       
                       <div>
                        <label htmlFor="p" className="block text-gray-400 mb-1">Password</label>
                        <input type="password" id="p" value={password} onChange={(e) => setpassword(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500" />
                       </div>
                       
                        <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition">Register</button>
                    </form>

                </div>

            </div>



        </>
    )
}