import axios from "axios";

const Api_Base = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers:{
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
    }
});

export default Api_Base;
