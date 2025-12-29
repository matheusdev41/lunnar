import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.56.1:8000/api",
    timeout: 5000,
})  


export default api;