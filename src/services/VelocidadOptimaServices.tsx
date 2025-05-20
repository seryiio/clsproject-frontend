import axios from "axios";
import { VelocidadOptimaInterface } from "@/interfaces/VelocidadOptimaInterface";

export const URL_VELOCIDADES_OPTIMAS = `http://localhost:3000/api/v1/velocidadOptima`;
export const URL_GPH_OPTIMOS = `http://localhost:3000/api/v1/gphOptimo`;
export const URL_RPM_OPTIMOS = `http://localhost:3000/api/v1/rpmOptimo`;
export const URL_VELOCIDADNOMINAL_OPTIMOS = `http://localhost:3000/api/v1/velocidadNominal`;
export const URL_RPMNOMINAL_OPTIMOS = `http://localhost:3000/api/v1/rpmNominal`;

export const getVelocidadOptima = async (setVelocidadOptima: React.Dispatch<React.SetStateAction<VelocidadOptimaInterface[]>>) => {
    try {
        const response = await axios.get(URL_VELOCIDADES_OPTIMAS);
        setVelocidadOptima(response.data);
    } catch (error) {
        console.error('Error al obtener las velocidad optima registradas:', error);
    }
    
};

export const actualizarVelocidadesOptimas = async (datos: VelocidadOptimaInterface[]) => {
    try {
        const response = await axios.put(URL_VELOCIDADES_OPTIMAS, datos);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar las velocidades óptimas:', error);
        throw error;
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



export const getVelocidadNominalPorEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_VELOCIDADNOMINAL_OPTIMOS}/${embarcacion}`);
        return response.data.velocidad_nominal;
        
    } catch (error) {
        console.error('Error al obtener Velocidad Nominal:', error);
        throw error;
    }
};



export const getRpmNominalPorEmbarcacion = async (embarcacion: string) => {
    try {
        const response = await axios.get(`${URL_RPMNOMINAL_OPTIMOS}/${embarcacion}`);
        return response.data.rpm_nominal;
        
    } catch (error) {
        console.error('Error al obtener Rpm nominal:', error);
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
