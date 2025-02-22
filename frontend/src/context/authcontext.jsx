import { createContext, useContext, useEffect, useState } from "react";
import axiosinstance from "../api";

const Authcontext = createContext();

export const Authprovider = ({children}) => {

    const[user,setuser]= useState("");
    const[token,settoken]= useState(localStorage.getItem("token") || "");

useEffect(() => {
if(token){
    axiosinstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchuser();
}else{
    delete axiosinstance.defaults.headers.common["Authorization"];
    setuser("");
}

},[token])

const fetchuser = async () => {
   try {
    const {data} = await axiosinstance.get("/users/user");
    setuser(data)
    
   } catch (error) {
    console.log("error fetching user", error);
   }
}


//register
const register = async (name,email,password) => {
    try {
        console.log({name,email,password});
      const response =  await axiosinstance.post("/users/register", {name,email,password});
      console.log("resgiration successful", response.data);
    } catch (error) {
        console.log("registration failed", error);
    }
}



//login
const login = async (email,password) => {
    try {
        const {data} = await axiosinstance.post("/users/login", {email,password});
        settoken(data.token);
        localStorage.setItem("token", data.token)
    } catch (error) {
        console.log("login failed", error);
    }
}




//logout
const logout = () =>{
    setuser("");
    settoken("");
    localStorage.removeItem("token");
}


return(
    <Authcontext.Provider value={{user,login,logout,register,settoken,setuser}}>
        {children}
    </Authcontext.Provider>
)

}


export const useAuth = () => useContext(Authcontext);