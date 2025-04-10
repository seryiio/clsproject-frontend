import axios from "axios";
import { OrdenNavegacion } from "@/interfaces/OrdenNavegacion";

export const URL_ORDEN_NAVEGACION = `https://myanime-api.onrender.com/api/v1/ordenNavegacionOptima`;

export const getOrdenNavegacionOptima = async (setOrdenNavegacionOptima: React.Dispatch<React.SetStateAction<OrdenNavegacion[]>>) => {
    try {
        const response = await axios.get(URL_ORDEN_NAVEGACION);
        setOrdenNavegacionOptima(response.data);
    } catch (error) {
        console.error('Error al obtener las ordenes de velocidad optima registradas:', error);
    }

};


