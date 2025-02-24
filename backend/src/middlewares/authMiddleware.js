import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Acceso denegado. No hay token" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Acceso denegado. Token inválido" });
    }

    req.user = user.dataValues;
    next();
  } catch (error) {
    res.status(401).json({ error: "Acceso denegado. Token inválido" });
  }
};
