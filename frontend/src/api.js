import axios from "axios";

const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
    
})


axiosinstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});




export default axiosinstance;