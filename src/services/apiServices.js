import axios from "axios";

const Api_Base = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers:{
        "x-api-key": import.meta.env.VITE_CAT_API_KEY, 
        //VITE_CAT_API_KEY es una variable de entorno que se creo para proteger la clave de la API
        //Siempre debe estar en mayusculas y con el prefijo VITE_ para que Vite la reconozca
        //Va en un archivo .env en la raiz del proyecto
        //Y ese archivo .env no debe ser subido al repositorio, por eso esta en el .gitignore
    }
});

export default Api_Base;
