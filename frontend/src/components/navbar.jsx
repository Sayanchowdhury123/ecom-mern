import { Link, useNavigate } from "react-router"
import { useAuth } from "../context/authcontext"
import { useState } from "react";

export default function Navbar() {
    const [menuopen, setmenuopen] = useState(false);
    const navigate = useNavigate();
    const [currentpage, setcurrentpage] = useState(1);

    const orders = () => {
        navigate("/orders");
    }

    const { user, logout } = useAuth();

    const [searchterm, setsearchterm] = useState("");


    const handlechange = (e) => {
        e.preventDefault();
        if (searchterm.trim()) {
            navigate(`/search?q=${searchterm}`)
        }
    }



    return (
        <>

            <nav className="bg-gray-900 text-white px-4 py-3 shadow-xl sticky top-0">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    <Link to="/" className="text-2xl font-bold hover:text-gray-400 transition">My shop</Link>

                    {user && (
                         
                         <div className="hidden md:flex">
                        <form onSubmit={handlechange} className="flex">

                            <input type="text" className="bg-white text-black px-3 py-1 rounded-l outline-none w-[200px] md:w-[250px]  " value={searchterm} onChange={(e) => setsearchterm(e.target.value)} />
                            <button type="submit" className="bg-gray-700 px-4 py-1 rounded-r hover:bg-gray-600">Search</button>

                        </form>


                    </div>


                    )}
                    
                    <div className=" hidden md:flex items-center space-x-4">

                        {user ? (
                            <>
                                <span className="text-gray-300">hello, {user.name}</span>
                                {
                                    user.isadmin && (
                                        <Link to="/admin" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition" >Admin</Link>
                                    )
                                }

                                <button onClick={logout} className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Logout</button>
                                <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition" onClick={orders}>Orders</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition" >Login</Link>
                                <Link to="/register" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Register</Link>


                            </>
                        )}

                        <Link to="/cart" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Cart</Link>


                    </div>

                    <button className="md:hidden " onClick={() => setmenuopen(!menuopen)}>
                        <span class="material-symbols-outlined">
                            menu
                        </span>
                    </button>

                </div>

                {
                    menuopen && (
                        <div className="md:hidden flex flex-col items-center space-y-2 mt-3 bg-gray-900 py-3 rounded">


                            <form onSubmit={handlechange} className="w-full px-4 flex">

                                <input type="text" className="bg-white text-black px-3 py-1 rounded-l outline-none w-full   " value={searchterm} onChange={(e) => setsearchterm(e.target.value)} />
                                <button type="submit" className="bg-gray-700 px-4 py-1 rounded-r hover:bg-gray-600">Search</button>

                            </form>

                            {user ? (
                                <>
                                    <span className="text-gray-300">hello, {user.name}</span>
                                    {
                                        user.isadmin && (
                                            <Link to="/admin" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition" >Admin</Link>
                                        )
                                    }

                                    <button onClick={logout} className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Logout</button>
                                    <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition" onClick={orders}>Orders</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition" >Login</Link>
                                    <Link to="/register" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Register</Link>


                                </>
                            )}

                            <Link to="/cart" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-600 transition">Cart</Link>

                        </div>
                    )
                }


            </nav>

        </>
    )
}