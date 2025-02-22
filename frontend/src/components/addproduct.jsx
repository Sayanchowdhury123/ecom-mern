import { useState } from "react";
import axiosinstance from "../api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Addproduct(){
const[name,setname] = useState("");
const[price,setprice] = useState("");
const[image,setimage] = useState();
const[category,setcategory]= useState("");
const[countinstock,setcountinstock] = useState("");
const[description,setdescription] = useState("")

const navigate = useNavigate();
const handlesubmit = async (e) => {
    e.preventDefault();

    try {
        const formdata = new FormData;

        formdata.append("name", name)
        formdata.append("price", price)
        if(image){
            formdata.append("image", image);
        }
        
        formdata.append("category", category);
        formdata.append("countinstock", countinstock);
        formdata.append("description", description);
        console.log(formdata);
       
        await axiosinstance.post("/admin/addproduct", formdata)
       alert("product added successfully")

       setcategory("");
       setname("");
       setprice("");
       setimage("")
       setdescription("")
       setcountinstock("")

       navigate('/admin/products')
       toast.success("Product added")
    } catch (error) {
        console.log("error adding products", error);
        toast.error("Product adding failed")
    }
}

    return(
    <>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Add product</h1>
        <form onSubmit={handlesubmit} className="space-y-4">
            <div>
            <label htmlFor=""  className="block text-gray-400 mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setname(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
            </div>

            <div>
                <label htmlFor=""  className="block text-gray-400 mb-1">price</label>
                <input type="number" value={price} onChange={(e) => setprice(e.target.value)} required className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
            </div>


            <div>
                <label htmlFor=""  className="block text-gray-400 mb-1">image</label>
                <input type="file"  onChange={(e) => setimage(e.target.files[0])} className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
            </div>

            <div>
                <label htmlFor=""  className="block text-gray-400 mb-1"> select a category</label>
                <select name="category" id=""  value={category} onChange={(e) => setcategory(e.target.value)} className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md outline-none">
                    <option value="Electronic">Electronic</option>
                    <option value="Appliance">Appliance</option>
                    <option value="Home goods">Home goods</option>
                    <option value="Apparel and accessories">Apparel and accessories</option>
                    <option value="Beauty and personal care">Beauty and personal care</option>
                    <option value="Health and wellness">Health and wellness</option>
                    <option value="Food and beverage">Food and beverage</option>
                    <option value="Books and media">Books and media</option>
                     <option value="Toys and games">Toys and games</option>
                     <option value="Sports equipment">Sports equipment</option>
                </select>
            </div>
          


          <div>
            <label htmlFor=""  className="block text-gray-400 mb-1">stock</label>
            <input type="number" value={countinstock} onChange={(e) => setcountinstock(e.target.value)} className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"/>
          </div>

          <div>
            <label htmlFor=""  className="block text-gray-400 mb-1">description</label>
            <textarea name="description" id="" value={description} onChange={(e) => setdescription(e.target.value)} className="w-full bg-gray-700 p-2 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
          </div>

          <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition">Add</button>
        </form>
        </div>
      
    </div>
    
    
    </>
    )
}