

import apm from "elastic-apm-node";
import apmAgent from "../config/apm.js";
import Gender from "../models/Gender.js";

export const getGenderService = async () => {
    try {
        apmAgent.startTransaction("getGenderService", "service")
        const genders = await Gender.findAll();
    
        apmAgent.endTransaction("getGenderService", "service")
        return genders;

    } catch (error) {
        throw new Error("Error al obtener el género")
    }
}

export const getGenderByIdService = async (id) => {
    try {
        const gender = await Gender.findByPk(id);
        if (!gender) throw new Error("Género no encontrado")
        return gender;
    } catch (error) {
        throw new Error("Error al obtener el género")
    }
}


export const createGenderService = async ({ name, description }) => {
    try {
        const newGender = await Gender.create({ name, description });
        return newGender;
    } catch (error) {
        throw new error("Error al crear el género")
    }
}

export const updateGenderService = async (id, body) => {
    try {
        const gender = await Gender.findByPk(id);
        if (!gender) throw new error("Genero no encontrado");
        await gender.update(body);
        return gender;
    } catch (error) {
        throw new error("Error al actualizar el género")
    }
}

export const deleteGenderService = async (id) => {
    try {
        const gender = await Gender.findByPk(id);
        if (!gender) throw new error("Genero no encontrado");
        await gender.destroy();
        return gender;
    } catch (error) {
        throw new error("Error al eliminar el género");
    }
}