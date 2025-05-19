import axios from "axios";
import { VelocidadOptimaInterface } from "@/interfaces/VelocidadOptimaInterface";

export const URL_VELOCIDADES_OPTIMAS = `http://localhost:3000/api/v1/velocidadOptima`;
export const URL_GPH_OPTIMOS = `http://localhost:3000/api/v1/gphOptimo`;
export const URL_RPM_OPTIMOS = `http://localhost:3000/api/v1/rpmOptimo`;

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

export const getGphPorEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_GPH_OPTIMOS}/${embarcacion}`);
        return response.data.gph;
        
    } catch (error) {
        console.error('Error al obtener Gph óptimo:', error);
        throw error;
    }
};

export const getRpmPorEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_RPM_OPTIMOS}/${embarcacion}`);
        return response.data.rpm;
        
    } catch (error) {
        console.error('Error al obtener Gph óptimo:', error);
        throw error;
    }
};
