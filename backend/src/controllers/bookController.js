import { Book } from "../models/index.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libro" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, description, image, stock } = req.body;
    if (!title || !author) {
      return res
        .status(400)
        .json({ error: "El título y el autor son obligatorios" });
    }
    const newBook = await Book.create({
      title,
      author,
      description,
      image,
      stock,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al crear libro" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar libro" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    await book.destroy();
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar libro" });
  }
};

export const uploadBookImage = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    const file = req.file;
    console.log(file);
    if (!file) {
      return res.status(400).json({ error: "Debes adjuntar una imagen" });
    }
    const filepath = `/api/images/${file.filename}`;
    await book.update({ image: filepath });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al subir la imagen del libro" });
  }
};
