import axiosinstance from "../api";
import { useNavigate, useParams } from "react-router";
import { useStore } from "../context/storecontext";
import { useEffect, useState } from "react";

import { useAuth } from "../context/authcontext";
import toast from "react-hot-toast";



export default function Details() {
    const { id } = useParams();
    const { user } = useAuth();
    const { addtocart } = useStore();
    const [product, setproduct] = useState("");
    const [error, seterror] = useState("");
    const [rating, setrating] = useState(0);
    const [comment, setcomment] = useState("");
    const [editreviewid, seteditreviewid] = useState(null);
    const [editreviewrating, seteditreviewrating] = useState(0);
    const [editreviewcomment, seteditreviewcomment] = useState("");
    const[related,setrelated] = useState([]);
    const navigate = useNavigate();


const fetch = async () => {
    try {
        const { data } = await axiosinstance.get(`/products/${id}`);
        setproduct(data);
    } catch (error) {
        seterror("failed to fetch the product")
    }
}

const fetchrelated = async () => {
    try {
        const {data} = await axiosinstance.get(`/products/${id}/related`);
        setrelated(data);
    } catch (error) {
     
        cons,errorole.log("error fetching related products");
    }
}


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axiosinstance.get(`/products/${id}`);
                setproduct(data);
            } catch (error) {
                seterror("failed to fetch the product")
            }

        }
        fetchdata();
        fetchrelated();
    }, [id])





    const addreview = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axiosinstance.post(`/products/reviews/${product._id}`, { rating, comment });

           
         setproduct({ ...product, reviews: [...product.reviews, data] })
         fetch();
          setrating(0);
          setcomment("")
            toast.success("Review added")
        } catch (error) {
            console.log("error adding review", error);
            toast.error("error adding review");
        }
    }

    const deletereview = async (reviewid) => {
        try {
            await axiosinstance.delete(`/products/${product._id}/reviews/${reviewid}`);

            setproduct((prev) => {
               return {...prev, reviews: prev.reviews.filter((rev) => rev._id !== reviewid)}
            })

          //  window.location.reload();
            toast.success("review deleted")
        } catch (error) {
              toast.error("review deleting failed")
        }
    }


    const handleupdate = async (reviewid) => {
        try {
            await axiosinstance.put(`/products/${product._id}/reviews/${reviewid}`, {comment: editreviewcomment, rating: editreviewrating});

          setproduct((prev) => {
              return {...prev, reviews: prev.reviews.filter((rev) => rev._id === reviewid ? {...rev, comment: editreviewcomment, rating: editreviewrating} : rev)}
           })

        

          fetch();

            seteditreviewid(null);
            toast.success("review updated");

        } catch (error) {
            console.log("error editing review", error);
            toast.error("review updating failed")
        }
    }

    if (error) return <div>{error}</div>

    return (
        <div className="bg-black p-6">
            <div className="max-w-[1300px] mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg relative top-6" >
                <div >
                    <img src={`http://localhost:5000/${product.image}`} alt="i" className="w-90 h-90 object-cover rounded-lg shadow-md mx-auto" />
                    <div className="mt-6">
                        <h1 className="text-2xl font-bold text-white">{product.name}</h1>
                        <p className="text-gray-300 mt-2">Description</p>
                        <p className="text-gray-300 mt-1">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">Price <span >$</span>{product.price}</p>
                        <p  className="text-gray-300 mt-1">Instock - {product.countinstock}</p>
                        <button onClick={() => addtocart(product._id,1)} className="mt-4 px-4 py-2 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-800 transition">Add to cart</button>
                    </div>
                </div>


                <div className="mt-10 bg-gray-800 p-6 rounded-lg ">
                    <h2 className="text-xl font-bold">Reviews ({product.numreviews})</h2>
                    {product.reviews?.length === 0 ? (<p className="text-gray-400">no reviews yet</p>) : (
                        <div key={product._id} className="">
                            {product.reviews?.map((review) => (
                                <div key={review._id} className="mt-4 p-4 border-b bg-gray-700 rounded-lg border border-gray-600 ">
                                    {editreviewid === review._id ? (
                                        <div>
                                          <textarea value={editreviewcomment}  onChange={(e) => seteditreviewcomment(e.target.value)} className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none">

                                          </textarea>

                                          <input type="number" min={1} max={5} value={editreviewrating} onChange={(e) => seteditreviewrating(e.target.value)} className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"/>
                                          <button onClick={() => handleupdate(review._id)} className="mt-2 px-4 py-2 bg-green-600 rounded-lg  text-white hover:bg-green-500">save</button>
                                          <button onClick={() => seteditreviewid(null)} className="mt-2 px-4 py-2 bg-gray-600 rounded-lg  text-white hover:bg-gray-500 ml-2">cancel</button>
                                        </div>
                                    ) : (
                                        <div >

                                    <p className="text-lg font-semibold">{review.name}</p>
                                    <p className="text-yellow-400">{"★".repeat(review.rating)}<span className="text-gray-500">{"☆".repeat(5 - review.rating)}</span></p>
                                    <p className="text-gray-300">{review.comment}</p>
                                    <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    {
                                        user && user._id === review.user && (
                                            <div className="mt-2">
                                                <button onClick={() => deletereview(review._id)} className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-500" >Delete</button>
                                                <button onClick={() => {
                                                    seteditreviewid(review._id)
                                                }} className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500 ml-2">Edit</button>
                                            </div>
                                        )
                                    }
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                      <div>
                        <form onSubmit={addreview} className="mt-4">
                            <h2 className="text-center text-xl font-bold">Add Review</h2>
                            <div className="mb-2">
                                <label htmlFor="" >Rating  </label>
                                <input type="number" value={rating} onChange={(e) => setrating(e.target.value)} min={1} max={5} className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="" >Comment</label>
                                <textarea value={comment} onChange={(e) => setcomment(e.target.value)} className="w-full p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none mt-2"></textarea>
                            </div>

                            <button type="submit" className="mt-4 px-4 py-2 bg-black font-semibold text-white rounded-lg shadow-md hover:bg-gray-800 transition">Add review</button>
                        </form>
                    </div>
                </div>





               <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {related?.map((item) => (
                <div key={item._id} className="border p-4 rounded-lg shadow-md">
                    <img src={`http://localhost:5000/${item.image}`} alt="img" className=" mb-2"/>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <button onClick={() => navigate(`/products/${item._id}`)} className="bg-black text-white px-3 py-2 rounded hover:bg-gray-800 transition mt-2">View Product</button>
                </div>
               ))}
                </div>

               </div>


            </div>

        </div>
    )
}