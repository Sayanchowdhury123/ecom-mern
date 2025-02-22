import { useEffect, useState } from "react";
import { useStore } from "../context/storecontext";
import axiosinstance from "../api";
import { useNavigate } from "react-router";


export default function Cart() {
    const { remove, updatecartquantity, cart, setcart } = useStore();
    useEffect(() => {
        const fetchcart = async () => {
            try {
                const { data } = await axiosinstance.get("/cart");
                console.log(data);
                setcart(data.items || []);
            } catch (error) {
                console.log(error);
                setcart([])
            }
        }

        fetchcart();
    }, [])



    const handleupdate = (productid, newquantity) => {
        updatecartquantity(productid, newquantity)
    }



    const totalprice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)


const navigate = useNavigate();


const handlecheckout = () => {
    navigate("/checkout");
}
    return (
        <div className="min-h-screen bg-black text-white p-6">


            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>


            {Array.isArray(cart) && cart.length > 0 ? (
                <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
                    {cart.map((item) => (
                        
                            <div key={item.product._id} className="flex items-center justify-between bg-gray-800 p-4 mb-4 rounded-md shadow">
                                <img src={`http://localhost:5000/${item.product.image}`} alt="img" className="w-24 h-24 object-cover rounded" />

                                <div className="flex-1 ml-4">
                                <p className="text-lg font-semibold">{item.product.name}</p>
                                <p className="text-gray-400">Price: ${item.product.price}</p>

                                <div className="flex items-center mt-2">
                                <span className="text-gray-600 mr-2">Quantity:</span>
                                <input type="number" value={item.quantity} onChange={(e) => handleupdate(item.product._id, e.target.value)} className="w-16 p-1 bg-gray-700 text-white border border-gray-500 rounded outline-none"/>
                                </div>

                               </div>
                                <button onClick={() => remove(item.product._id)} className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition rounded">Remove</button>

                            </div>

                        
                    ))}

                    <div className="text-right mt-6 ">

                        <h2 className="text-xl font-semibold">Total: ${totalprice.toFixed(2)}</h2>
                        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition mt-4" onClick={handlecheckout}>Proceed to checkout</button>
                    </div>

                </div>
            ) : (
                <p className="text-center text-gray-600 text-xl mt-10"> your cart is empty</p>
            )


            }

        </div>

    )
}