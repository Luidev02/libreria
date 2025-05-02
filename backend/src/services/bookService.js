import { Op } from "sequelize";
import { Book } from "../models/index.js";
import apmAgent from "../config/apm.js";

export const getAllBooksService = async () => {
  const span = apmAgent.startSpan("getAllBooksService", "service");
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    throw new Error("Error al obtener libros");
  } finally {
    if (span) span.end();
  }
};

export const getBookByIdService = async (id) => {
  const span = apmAgent.startSpan("getBookByIdService", "service");
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    return book;
  } catch (error) {
    throw new Error("Error al obtener libro");
  } finally {
    if (span) span.end();
  }
};

export const createBookService = async ({
  title,
  author,
  description,
  synopsis,
  image,
  stock,
  gender_id,
  isbn,
  publicationDate,
}) => {
  const span = apmAgent.startSpan("createBookService", "service");
  try {
    if (!title || !author) {
      throw new Error("El título y el autor son obligatorios");
    }
    const newBook = await Book.create({
      title,
      author,
      description,
      synopsis,
      image,
      stock,
      gender_id,
      isbn,
      publicationDate,
    });
    return newBook;
  } catch (error) {
    throw error;
  } finally {
    if (span) span.end();
  }
};

export const updateBookService = async (id, data) => {
  const span = apmAgent.startSpan("updateBookService", "service");
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    await book.update(data);
    return book;
  } catch (error) {
    throw new Error("Error al actualizar libro");
  } finally {
    if (span) span.end();
  }
};

export const deleteBookService = async (id) => {
  const span = apmAgent.startSpan("deleteBookService", "service");
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    await book.destroy();
    return { message: "Libro eliminado" };
  } catch (error) {
    throw new Error("Error al eliminar libro");
  } finally {
    if (span) span.end();
  }
};

export const uploadBookImageService = async (id, file) => {
  const span = apmAgent.startSpan("uploadBookImageService", "service");
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    if (!file) {
      throw new Error("Debe seleccionar una imagen");
    }
    const filepath = `/api/images/${file.filename}`;
    await book.update({ image: filepath });
    return book;
  } catch (error) {
    throw new Error("Error al subir imagen");
  } finally {
    if (span) span.end();
  }
};

export const getFilterBooksService = async (query) => {
  const span = apmAgent.startSpan("getFilterBooksService", "service");
  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    return books;
  } catch (error) {
    throw new Error("Error al obtener libros por género");
  } finally {
    if (span) span.end();
  }
};
