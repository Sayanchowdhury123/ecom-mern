import { useEffect, useState } from "react"
import axiosinstance from "../api";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router";


export default function Orderpage(){
const[orders,setorders]= useState([]);
const {user} = useAuth();


useEffect(() => {
    const fetchorders = async () => {
        const {data} = await axiosinstance.get("/admin/orders",{withCredentials:true});
        
        setorders(data);
    }

    fetchorders();
},[])

    const handleupdate = async (id,newstatus) => {
       try {
        await axiosinstance.put(`/admin/orders/${id}`, {status: newstatus},{withCredentials:true});
        setorders(orders?.map((order) => (order._id === id ? {...order, status: newstatus} : order)))
        alert("order updated")
       } catch (error) {
        console.log("error updating order", error);
       }
    }

    const handledelete = async (id) => {
        try {
            await axiosinstance.delete(`/admin/orders/${id}`);
           
            setorders(orders?.filter((order) => order._id !== id))
            alert("order deleted");
        } catch (error) {
            console.log("error deleting order", error);
        }
    }

    return(
        <>
        <div className="min-h-screen p-6 text-white bg-black">
            <h1 className="text-3xl font-bold text-center mb-6">{
                user?.isadmin ? "All orders" : "Your orders"
                }</h1>
            {
                orders.length === 0 ? (
                    <p className="text-center text-gray-400 text-xl mt-10">no orders found</p>
                ): (
                    <div className="space-y-6">
                        {
                            orders?.map((order) => (
                            
                                <div key={order._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                                  <h2 className="text-lg font-semibold text-white">
                                    order ID: {order._id}
                                  </h2>
                                  <p className="text-gray-400">Total Price: <span className="text-white">${order.totalprice}</span></p>
                                  <p className="text-gray-400">Status: <span className="text-white">{order.status}</span></p>
                                  <p className="text-gray-400">Ordered on:{" "} 
                                    <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span></p>

                                  <ul className="mt-4 space-x-2">
                                    {order.items?.map((item) => (
                                        <li key={item.product._id} className="text-gray-300">
                                               {item.product.name} - {item.quantity} * ${item.product.price}
                                        </li>
                                    ))}
                                  </ul>

                                  
                                   {user?.isadmin && (
                                     

                                     <div className="mt-4 ">
                                    <select value={order.status} onChange={ (e) => handleupdate(order._id,e.target.value)}
                                        className="bg-gray-700 text-white p-2 rounded-md"
                                        >
                                        
                                     
                                        <option value="pending">pending</option>
                                        <option value="delivered">delivered</option>
                                        <option value="shipped">shipped</option>
                                       
                                    </select>

                                    <button onClick={() => handledelete(order._id)} className="ml-4 bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition ">Delete</button>
                                    </div>
                                   )}
                                  
                            
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
        
        
        </>
    )
}