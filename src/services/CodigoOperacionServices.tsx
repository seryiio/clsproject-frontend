import axios from "axios";
import { CodigoOperacion } from "@/interfaces/CodigoOperacion";

export const URL_CODIGOS_OPERACION = `https://myanime-api.onrender.com/api/v1/codigoOperacion`;

export const getCodigoOperacion = async (setCodigoOperacion: React.Dispatch<React.SetStateAction<CodigoOperacion[]>>) => {
    try {
        const response = await axios.get(URL_CODIGOS_OPERACION);
        setCodigoOperacion(response.data);
    } catch (error) {
        console.error('Error al obtener las ordenes de velocidad optima registradas:', error);
    }
};


export const getCodigoOperacionporEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_CODIGOS_OPERACION}/${embarcacion}`);
        return response.data.codigo_orden;
    } catch (error) {
        console.error('Error al obtener código de operación:', error);
        throw error;
    }
};

