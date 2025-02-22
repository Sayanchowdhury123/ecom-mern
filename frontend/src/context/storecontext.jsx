import { createContext, useContext, useState, useEffect } from "react";
import axiosinstance from "../api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";



const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const[products,setproducts] = useState([]);
    const[cart,setcart] = useState([]);
    const[fav,setfav]= useState([]); 
    

const fetchcart = async () => {
    const {data} = await axiosinstance.get("/cart");
  
    setcart(data.items);
}

    useEffect(() => {
        const fectchproducts = async () => {
            try {
                const {data} = await axiosinstance.get("/products");
                setproducts(data)
            } catch (error) {
                console.log("error fetching data", error);
            }
        }
        fetchcart();
        fectchproducts();
       
    },[]);




    //add to cart
    const addtocart = async (productid, quantity = 1) => {
       const {data} = await axiosinstance.post("/cart", {productid,quantity})
       setcart(data.cart?.items || [])
       toast.success("Added to cart")
       
    }


   const updatecartquantity = async (productid, newquantity) => {
    try {
        const {data} = await axiosinstance.put(`/cart/${productid}`, {quantity: newquantity});
        setcart(data.cart.items || [])
        console.log("updated cart", data.cart);
        toast.success("cart quantity updated")
    } catch (error) {
        console.log(error);
        toast.error("cart update failed")
    }
  
   }


    //remove from cart
    const remove = async (productid) => {
        try {
            const {data} = await axiosinstance.delete(`/cart/${productid}`);
            setcart(data.cart?.items || []);
             toast.success("Removed from cart")
        } catch (error) {
            console.log(error);
            toast.error("removing from cart failed")
        }
    
        
    }

// add to favourites
    const addtofav = (p) => {
        setfav([...fav, p])
     
        alert("added to wishlist")
    }
//remove from favourites
const removefav = (productid) => {
    setcart(fav.filter((item) => item._id !== productid))
    
    alert("remove from wishlist")
    
}



    return(
        <StoreContext.Provider value={{products,cart,addtocart,remove,addtofav,fav,removefav,updatecartquantity,fetchcart,setcart}}>
            {children}
        </StoreContext.Provider>
    )
}


export const useStore = () => useContext(StoreContext);