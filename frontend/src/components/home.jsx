import { useStore } from "../context/storecontext";
import { Link } from "react-router";
import axiosinstance from "../api";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";




export default function Home() {
    const [products, setproducts] = useState([])
    const { addtofav } = useStore();
    const navigate = useNavigate();
    const [category, setcategory] = useState("");
    const [filteredcategories, setfilteredcategories] = useState([])
    const[currentpage,setcurrentpage] = useState(1);

    useEffect(() => {
        const fectchproducts = async () => {
            try {
                const { data } = await axiosinstance.get("/products");
                setproducts(data)
                setfilteredcategories(data)
            } catch (error) {
                console.log("error fetching data", error);
            }
        }

        fectchproducts();

    }, []);

    useEffect(() => {
        if (category === "All") {
            setfilteredcategories(products)
        } else {
            setfilteredcategories(products.filter((product) => product.category === category))
        }

    }, [category])


    const postsperpage = 6;

    const totalpage = Math.ceil(filteredcategories.length / postsperpage);

    const startindex = (currentpage - 1) * 6;

    const currentposts = filteredcategories.slice(startindex, startindex+ postsperpage );

    const gotopage = (page) =>{
        if(page >= 1 && page <= totalpage){
         setcurrentpage(page)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-black text-white p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
                <div>

                    <div className="flex justify-center mb-6">
                        <label htmlFor="c" className="text-lg font-semibold mr-3">Filter by categories</label>
                        <select value={category} onChange={(e) => setcategory(e.target.value)} id="c" className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md outline-none">
                            <option value="All">All</option>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {
                            currentposts?.map((product) => (

                                <div key={product._id} className="bg-gray-900 p-4 rounded-lg shadow-lg  ">
                                    <div className="">
                                        <img src={`http://localhost:5000/${product.image}`} alt="img" className="w-full h-99  object-cover rounded-md mb-4" />
                                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                        <p className="text-gray-400 mb-4"> Price: ${product.price}</p>

                                        <div className="flex space-x-4">
                                        <Link to={`/products/${product._id}`} className="bg-blue-600 px-4 py-2 rounded text-white">View</Link>
                                        <button onClick={() => {
                                            addtofav(product)
                                            navigate("/wishlist")
                                        }} className="bg-gray-700 px-4 py-2 rounded text-white">Add to WishList</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-2 mt-6">
            <button onClick={ () => gotopage(currentpage-1)} disabled={currentpage === 1} className={`px-4 py-2 rounded-md ${currentpage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-700"}`}>Previous</button>
            {
                [...Array(totalpage)].map((num,index) =>(
                    <button key={index} onClick={() => gotopage(currentpage+1)}
                    className={`px-4 py-2 rounded-md transition ${currentpage === index + 1 ? "bg-gray-900 text-white font-bold" : "bg-gray-700  text-gray-300 hover:bg-gray-600"}`}  >
                        {index+1}
                    </button>
                ))
            }
            <button onClick={() => gotopage(currentpage+1)} disabled={currentpage === totalpage} className={`px-4 py-2 rounded-md ${currentpage === totalpage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-700"}`}>Next</button>
            </div>



            </div>



          

        </>
    )
}