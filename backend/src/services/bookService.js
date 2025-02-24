import { Op } from "sequelize";
import { Book } from "../models/index.js";

export const getAllBooksService = async () => {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    throw new Error("Error al obtener libros");
  }
};

export const getBookByIdService = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error("Libro no encontrado");
    }
    return book;
  } catch (error) {
    throw new Error("Error al obtener libro");
  }
};

export const createBookService = async (
{  title,
  author,
  description,
  synopsis,
  image,
  stock,
  gender_id,
  isbn,
  publicationDate}
) => {
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
    throw new Error("Error al crear libro");
  }
};


export const updateBookService = async (id) =>{
    try {
        const book = await Book.findByPk(id);
        if (!book) {
          throw new Error("Libro no encontrado");
        }
        await book.update(req.body);
        return book;
    } catch (error) {
        throw new Error("Error al actualizar libro");
    }
}

export const deleteBookService = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
          throw new Error("Libro no encontrado");
        }
        await book.destroy();
        return { message: "Libro eliminado" };
    } catch (error) {
        throw new Error("Error al eliminar libro");
    }
}

export const uploadBookImageService = async (id,file) => {
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
    }
}

export const getFilterBooksService = async (query) => {
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
}
}
