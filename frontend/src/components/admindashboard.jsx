import { useEffect, useState } from "react"
import axiosinstance from "../api";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";


export default function Admindashboard() {
    const [users, setusers] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchusers = async () => {

            try {
                const { data } = await axiosinstance.get("/admin/users");
                setusers(data);
            } catch (error) {
                console.log("error feching users", error);
            }

        }
        fetchusers();
    }, [token])



    const makeadmin = async (id) => {
        try {
            await axiosinstance.put(`/admin/make-admin/${id}`);
            toast.success("user promoted to admin")
        } catch (error) {
            toast.error("failed to promote user")
        }
    }

    const deletadmin = async (id) => {
        try {
            await axiosinstance.delete(`/admin/users/${id}`)
            toast.success("user deleted")
        } catch (error) {
            toast.error("failed to delete user")
        }
    }


const adminproduct = () => {
    navigate("/admin/products")
}

    return (

        <>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <h2 className="text-3xl font-semibold text-blue-600 mb-6">Admin dashboard</h2>

                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden p-1">
                    <table className="w-full border-collapse ">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="py-3 px-4 text-gray-700 border">ID</th>
                                <th className="py-3 px-4 text-gray-700 border">name</th>
                                <th className="py-3 px-4 text-gray-700 border">email</th>
                                <th className="py-3 px-4 text-gray-700 border">admin</th>
                                <th className="py-3 px-4 text-gray-700 border">Actons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id} className="text-center border-b">
                                    <td className="py-3 px-4">{user._id}</td>
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.isadmin ? (<span className="text-green-600 font-medium">Yes</span>) : (<span className="text-red-600 font-medium">No</span>)}</td>
                                    <td className="py-3 px-4 flex justify-center space-x-3">
                                        {!user.isadmin && (
                                            <button onClick={() => makeadmin(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Make admin</button>
                                        )}




                                        {!user.isadmin && (
                                            <button onClick={() => deletadmin(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <button onClick={adminproduct} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition mt-6">Admin product</button>
            </div>



        </>
    )
}