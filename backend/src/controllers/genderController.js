import { updateBookService } from "../services/bookService.js";
import { createGenderService, deleteGenderService, getGenderByIdService, getGenderService } from "../services/genderService.js";
import apmAgent from "../config/apm.js";

export const getGenders = async (req, res) => {
  const transaction = apmAgent.startTransaction("getGenders", "controller");
  try {
    const genders = await getGenderService();
    res.json(genders);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ message: "Error al obtener los géneros" });
  } finally {
    transaction.end();
  }
};

export const getGenderById = async (req, res) => {
  const transaction = apmAgent.startTransaction("getGenderById", "controller");
  try {
    const gender = await getGenderByIdService(req.params.id);
    res.json(gender);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ message: "Error al obtener el género" });
  } finally {
    transaction.end();
  }
};

export const createGender = async (req, res) => {
  const transaction = apmAgent.startTransaction("createGender", "controller");
  try {
    const data = req.body;
    const newGender = await createGenderService(data);
    res.status(201).json(newGender);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ message: "Error al crear el género" });
  } finally {
    transaction.end();
  }
};

export const updateGender = async (req, res) => {
  const transaction = apmAgent.startTransaction("updateGender", "controller");
  try {
    const gender = await updateBookService(req.params.id, req.body);
    res.json({ message: "Género actualizado", gender });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ message: "Error al actualizar el género" });
  } finally {
    transaction.end();
  }
};

export const deleteGender = async (req, res) => {
  const transaction = apmAgent.startTransaction("deleteGender", "controller");
  try {
    const gender = await deleteGenderService(req.params.id);
    res.json({ message: "Género eliminado" });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ message: "Error al eliminar el género" });
  } finally {
    transaction.end();
  }
};
