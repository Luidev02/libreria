import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  getFilterBooksService,
  updateBookService,
  uploadBookImageService,
} from "../services/bookService.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksService();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libro" });
  }
};

export const createBook = async (req, res) => {
  try {
    const datos = req.body;
    const newBook = await createBookService(datos);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al crear libro" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await updateBookService(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar libro" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await deleteBookService(id);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar libro" });
  }
};

export const uploadBookImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const book = await uploadBookImageService(id, file);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al subir la imagen del libro" });
  }
};

export const getfilterBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await getFilterBooksService(query);
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al filtrar libros" });
  }
};
