import { useEffect, useState } from "react";
import { useParams } from "react-router"
import axiosinstance from "../api";
import celebration from "../assets/celebration_28dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";
import toast from "react-hot-toast";


export default function Confirmation() {
    const { id } = useParams();
    const [order, setorder] = useState("");


    useEffect(() => {
        const fetchorder = async () => {
            try {
                const { data } = await axiosinstance.get(`/admin/orders/${id}`);
                setorder(data);
                toast.success("order confirmed")
            } catch (error) {
                console.log("error fetching order", error);
                toast.error("order confirmation failed")
            }

        }
        fetchorder();
    }, [id])

    if (!order) return <p className="text-gray-500 text-center mt-4">loading ...</p>;

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">

                <div className="">

                    <h1 className="text-3xl text-gray-100 font-bold mb-6 ">
                        Order confirmed

                    </h1>



                </div>




                <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
                    <p className="text-lg"><strong className="text-gray-300">Order ID: </strong> <span className=" font-semibold text-gray-200"> {order._id}</span></p>
                    <p className="text-lg"><strong className="text-gray-300">Total Price: </strong> <span className="text-green-400">${order.totalprice}</span></p>
                    <p className="text-lg"><strong className="text-gray-300">Status: </strong>
                        <span className="uppercase font-semibold text-gray-200">
                            {order.status}
                        </span> </p>
                </div>
            </div>

        </>
    )
}