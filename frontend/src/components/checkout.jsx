import { useState } from "react"
import { useNavigate } from "react-router"
import { useStore } from "../context/storecontext";
import axiosinstance from "../api";
import toast from "react-hot-toast";


export default function Checkout() {
    const { cart } = useStore();
    console.log(cart);
    const [shippingaddress, setshippingadress] = useState({
        fullname: "",
        address: "",
        city: "",
        postalcode: "",
        country: "",

    });
    const [paymentmethod, setpaymentmethod] = useState("");
    const navigate = useNavigate();

    const handlechange = (e) => {
        setshippingadress({ ...shippingaddress, [e.target.name]: e.target.value })
    }

    const handlecheckout = async () => {
        try {
            const totalprice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

            const { data } = await axiosinstance.post("/admin/orders", { items: cart, shippingaddress, paymentmethod, totalprice }, { withCredentials: true })

            navigate(`/order-confirmation/${data._id}`)
            toast.success("checkout successfull")
        } catch (error) {
            console.log("error placing order");
            toast.error("checkout failed")
        }
    }


    return (
        <>
            <div  className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

                    <div className="space-y-4">
                         
                         <div>
                         <label htmlFor=""  className="block text-gray-400 mb-1">Full Name</label>
                         <input type="text" name="fullname" value={shippingaddress.fullname} onChange={handlechange} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                         </div>
                       

                       <div>
                       <label htmlFor=""  className="block text-gray-400 mb-1">Address</label>
                       <input type="text"  name="address" value={shippingaddress.address} onChange={handlechange} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                       </div>

                       <div>
                       <label htmlFor=""  className="block text-gray-400 mb-1">City</label>
                       <input type="text"  name="city" value={shippingaddress.city} onChange={handlechange} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                       </div>
                       
                       <div>
                       <label htmlFor=""  className="block text-gray-400 mb-1">Postal Code</label>
                       <input type="text"  name="postalcode" value={shippingaddress.postalcode} onChange={handlechange} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                       </div>
                        
                       <div>
                       <label htmlFor=""  className="block text-gray-400 mb-1">Country</label>
                       <input type="text" name="country" value={shippingaddress.country} onChange={handlechange} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                       </div>


                       <div  className="">
                       <label htmlFor=""  className="block text-gray-400 mb-1">Payment Method</label>
                       <select value={paymentmethod} onChange={(e) => setpaymentmethod(e.target.value)} className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md outline-none">
                            <option value="none">None</option>
                            <option value="Cash on delivery">Cash on delivery</option>
                        </select>

                       </div>
                      
                        <button onClick={handlecheckout}  className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition">Place order</button>
                    </div>

                </div>

            </div>

        </>
    )
}