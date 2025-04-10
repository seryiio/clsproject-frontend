import axios from "axios";
import { VelocidadOptimaInterface } from "@/interfaces/VelocidadOptimaInterface";

export const URL_VELOCIDADES_OPTIMAS = `https://clsproject-backend.onrender.com/api/v1/velocidadOptima`;


export const getVelocidadOptima = async (setVelocidadOptima: React.Dispatch<React.SetStateAction<VelocidadOptimaInterface[]>>) => {
    try {
        const response = await axios.get(URL_VELOCIDADES_OPTIMAS);
        setVelocidadOptima(response.data);
    } catch (error) {
        console.error('Error al obtener las velocidad optima registradas:', error);
    }
    
};

export const getVelocidadPorEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_VELOCIDADES_OPTIMAS}/${embarcacion}`);
        return response.data.velocidad_optima;
        
    } catch (error) {
        console.error('Error al obtener velocidad óptima:', error);
        throw error;
    }
};
