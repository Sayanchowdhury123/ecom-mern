import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import axiosinstance from "../api";



export default function Search(){
const[products,setproducts] = useState([]);
const location = useLocation();
const searchquery = new URLSearchParams(location.search).get("q");
const navigate = useNavigate();


useEffect(() => {
    const fetch = async () => {
        try {
            const {data} = await axiosinstance.get(`/products/searching?q=${searchquery}`);
            setproducts(data);
            console.log(data);
        } catch (error) {
            console.log("error searching products", error);
        }
    }

    if(searchquery) fetch();
},[searchquery])

    return(

        <>
        
           <div className="min-h-screen bg-black text-white p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Serach Results for <span className="text-gray-400">"{searchquery}"</span> </h2>


         {
            products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <div key={product._id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                       
                       <img src={`http://localhost:5000/${product.image}`} alt="i" className="w-full h-40 object-cover rounded-md mb-3" />
                       <h3 className="text-lg font-semibold text-white ">{product.name}</h3>
                       <p className="text-gray-400">${product.price}</p>
                       <button className="mt-3 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition" onClick={() => navigate(`/products/${product._id}`)}>View Details</button>
                    </div>
                ))}
              </div>
            ) : (
                <p>no results found</p>
            )
         }


              

           </div>
        
        
        </>
    )
}