import Gender from "../models/Gender.js";

export const getGenders = async (req, res) => {
  try {
    const genders = await Gender.findAll();
    res.json(genders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los géneros" });
  }
};

export const getGenderById = async (req, res) => {
  try {
    const gender = await Gender.findByPk(req.params.id);
    if (!gender)
      return res.status(404).json({ message: "Género no encontrado" });
    res.json(gender);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el género" });
  }
};

export const createGender = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGender = await Gender.create({ name, description });
    res.status(201).json(newGender);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el género" });
  }
};

export const updateGender = async (req, res) => {
  try {
    const gender = await Gender.findByPk(req.params.id);
    if (!gender)
      return res.status(404).json({ message: "Género no encontrado" });

    await gender.update(req.body);
    res.json({ message: "Género actualizado", gender });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el género" });
  }
};

export const deleteGender = async (req, res) => {
  try {
    const gender = await Gender.findByPk(req.params.id);
    if (!gender)
      return res.status(404).json({ message: "Género no encontrado" });

    await gender.destroy();
    res.json({ message: "Género eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el género" });
  }
};
