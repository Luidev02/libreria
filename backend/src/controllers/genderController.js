import { updateBookService } from "../services/bookService.js";
import { createGenderService, deleteGenderService, getGenderByIdService, getGenderService } from "../services/genderService.js";

export const getGenders = async (req, res) => {
  try {
    const genders = await getGenderService();
    res.json(genders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los géneros" });
  }
};

export const getGenderById = async (req, res) => {
  try {
    const gender = await getGenderByIdService(req.params.id)
    res.json(gender);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el género" });
  }
};

export const createGender = async (req, res) => {
  try {
    const data = req.body;
    const newGender = await createGenderService(data);
    res.status(201).json(newGender);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el género" });
  }
};

export const updateGender = async (req, res) => {
  try {
    const gender = await updateBookService(req.params.id, req.body);
    res.json({ message: "Género actualizado", gender });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el género" });
  }
};

export const deleteGender = async (req, res) => {
  try {
    const gender = await deleteGenderService(req.params.id);
    res.json({ message: "Género eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el género" });
  }
};
