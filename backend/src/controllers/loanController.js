import { Book, Loan } from "../models/index.js";
import User from "../models/User.js";
import apmAgent from "../config/apm.js";

export const getAllLoans = async (req, res) => {
  const transaction = apmAgent.startTransaction("getAllLoans", "controller");
  try {
    const loan = await Loan.findAll({
      include: [
        {
          model: Book,
          as: "Book",
          attributes: ["title", "author"],
        },
      ],
    });
    res.json(loan);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al obtener los prestamos" });
  } finally {
    transaction.end();
  }
};

export const getAllLoansPerUser = async (req, res) => {
  const transaction = apmAgent.startTransaction("getAllLoansPerUser", "controller");
  try {
    const loan = await Loan.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Book,
          as: "Book",
          attributes: ["title", "author"],
        },
      ],
    });
    res.json(loan);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al obtener los prestamos" });
  } finally {
    transaction.end();
  }
};

export const getLoanById = async (req, res) => {
  const transaction = apmAgent.startTransaction("getLoanById", "controller");
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "El prestamo no existe" });
    }
    const user = await User.findByPk(loan.userId);

    res.json({ loan, ...user.dataValues });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al obtener el prestamo" });
  } finally {
    transaction.end();
  }
};

export const createLoan = async (req, res) => {
  const transaction = apmAgent.startTransaction("createLoan", "controller");
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ error: "Debe especificar el usuario y el libro" });
    }
    const book = await Book.findByPk(bookId);
    if (book.stock <= 0) {
      return res.status(400).json({ error: "No hay stock disponible" });
    }

    const loan = await Loan.create({ userId, bookId, loanDate: new Date() });
    if (!loan) {
      return res.status(400).json({ error: "No se pudo crear el prestamo" });
    }

    await book.update({ stock: book.stock - 1 });

    res.json(loan);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al crear el prestamo" });
  } finally {
    transaction.end();
  }
};

export const createLoanPerUser = async (req, res) => {
  const transaction = apmAgent.startTransaction("createLoanPerUser", "controller");
  try {
    const { id } = req.user;
    const { bookId } = req.body;
    if (!bookId) {
      return res
        .status(400)
        .json({ error: "Debe especificar el usuario y el libro" });
    }
    const book = await Book.findByPk(bookId);
    if (book.stock <= 0) {
      return res.status(400).json({ error: "No hay stock disponible" });
    }

    const loan = await Loan.create({
      userId: id,
      bookId,
      loanDate: new Date(),
    });
    if (!loan) {
      return res.status(400).json({ error: "No se pudo crear el prestamo" });
    }

    await book.update({ stock: book.stock - 1 });

    res.json(loan);
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al crear el prestamo" });
  } finally {
    transaction.end();
  }
};

export const updateLoan = async (req, res) => {
  const transaction = apmAgent.startTransaction("updateLoan", "controller");
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "El prestamo no existe" });
    }
    const updateloan = await loan.update(req.body);
    if (req.body.status === "returned" && loan.status !== "returned") {
      const book = await Book.findByPk(loan.bookId);
      await book.update({ stock: book.stock + 1 });
    }

    res.json({ message: "Préstamo actualizado correctamente", loan });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al actualizar el prestamo" });
  } finally {
    transaction.end();
  }
};

export const deleteLoan = async (req, res) => {
  const transaction = apmAgent.startTransaction("deleteLoan", "controller");
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "El prestamo no existe" });
    }
    await loan.destroy();
    res.json({ message: "Préstamo eliminado correctamente", loan });
  } catch (error) {
    apmAgent.captureError(error);
    res.status(500).json({ error: "Error al eliminar el prestamo" });
  } finally {
    transaction.end();
  }
};
