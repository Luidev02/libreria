import { Op, Sequelize } from "sequelize";
import { Book, Loan } from "../models/index.js";
import User from "../models/user.js";

export const getloanReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const loans = await Loan.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [{ model: User, as: "user", attributes: ["name"] }]

    });
    res
      .status(200)
      .json({
        message: "Informes de préstamos obtenidos correctamente",
        data: loans,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener informes de préstamos" });
  }
};

export const getUsersReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const users = await User.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      attributes: ["name", "email", "verified"],
    });
    res
      .status(200)
      .json({
        message: "Informes de usuarios obtenidos correctamente",
        data: users,
      });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener informes de usuarios" });
  }
};
