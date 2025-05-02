import apmAgent from "../config/apm.js";
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
  const transaction = apmAgent.startTransaction("getAllBooks", "controller");
  try {
    
    const books = await getAllBooksService();
    res.json(books);
  } catch (error) {
    apmAgent.captureError(error);
    console.error(error);
    res.status(500).json({ error: "Error al obtener libros" });
  } finally {
    transaction.end();
  }
};

export const getBookById = async (req, res) => {
  const transaction = apmAgent.startTransaction("getBookById", "controller");
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id);
    res.json(book);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al obtener libro" });
  } finally {
    transaction.end();
  }
};

export const createBook = async (req, res) => {
  const transaction = apmAgent.startTransaction("createBook", "controller");
  try {
    const datos = req.body;
    const newBook = await createBookService(datos);
    res.status(201).json(newBook);
  } catch (error) {
    apmAgent.captureError(error);
    console.log(error);
    res.status(500).json({ error: "Error al crear libro" });
  } finally {
    transaction.end();
  }
};

export const updateBook = async (req, res) => {
  const transaction = apmAgent.startTransaction("updateBook", "controller");
  try {
    const { id } = req.params;
    const book = await updateBookService(id);
    res.json(book);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al actualizar libro" });
  } finally {
    transaction.end();
  }
};

export const deleteBook = async (req, res) => {
  const transaction = apmAgent.startTransaction("deleteBook", "controller");
  try {
    const { id } = req.params;
    const book = await deleteBookService(id);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al eliminar libro" });
  } finally {
    transaction.end();
  }
};

export const uploadBookImage = async (req, res) => {
  const transaction = apmAgent.startTransaction("uploadBookImage", "controller");
  try {
    const { id } = req.params;
    const file = req.file;
    const book = await uploadBookImageService(id, file);
    res.json(book);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al subir la imagen del libro" });
  } finally {
    transaction.end();
  }
};

export const getfilterBooks = async (req, res) => {
  const transaction = apmAgent.startTransaction("getfilterBooks", "controller");
  try {
    const { query } = req.query;
    const books = await getFilterBooksService(query);
    res.json(books);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al filtrar libros" });
  } finally {
    transaction.end();
  }
};
