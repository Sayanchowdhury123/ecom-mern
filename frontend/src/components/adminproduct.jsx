import { useEffect, useState } from "react"
import axiosinstance from "../api"
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Adminproduct() {

    const [products, setproducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const { data } = await axiosinstance.get("/admin/products")
                setproducts(data)
            } catch (error) {
                console.log("error fetching products", error);
            }
        }
        fetchdata();
    }, [])

    const deleteproduct = async (id) => {
        if (window.confirm("are you sure you delete this product")) {
            try {
                await axiosinstance.delete(`/admin/products/${id}`)
                setproducts(products.filter((product) => product._id !== id));
                toast.success("product deleted");
            } catch (error) {
                console.log("error deleting products", error);
            }
        }

    }


    const edit = (id) => {
        navigate(`/editproduct/${id}`)
    }

    return (
        <>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <h1 className="text-3xl font-semibold text-blue-600 mb-6"> Manage products</h1>
                <Link to="/addproduct" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"> Add product</Link>

                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden  p-1">

                    <table className="w-full border-collapse ">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="py-3 px-4 text-gray-700 border">Image</th>
                                <th className="py-3 px-4 text-gray-700 border">Name</th>
                                <th className="py-3 px-4 text-gray-700 border">Price</th>
                                <th className="py-3 px-4 text-gray-700 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product) => (
                                    <tr key={product._id} className="text-center border-b">
                                        <td className="py-3 px-4">
                                            <img src={`http://localhost:5000/${product.image}`} alt="" className="w-16 h-16 object-cover" />
                                        </td >
                                        <td className="py-3 px-4">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            ${product.price}
                                        </td>
                                        <td  className="py-3 px-4 flex justify-center space-x-3">
                                            <button onClick={() => edit(product._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Edit</button>
                                            <button onClick={() => deleteproduct(product._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>


        </>
    )
}