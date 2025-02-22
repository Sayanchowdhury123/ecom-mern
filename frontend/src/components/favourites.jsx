import { useEffect } from "react"
import axiosinstance from "../api"
import { useStore } from "../context/storecontext";


export default function Fav() {

    const { fav ,removefav} = useStore();





    return (
        <>

            <h1>WishList</h1>
            {
                fav?.map((f) => (
                    <div key={f._id}>
                        <p>  {f.name}</p>
                        <p>Price ${f.price}</p>
                        <button onClick={() => removefav(f._id)}>Remove form wishlist</button>
                    </div>
                ))
            }


        </>
    )
}