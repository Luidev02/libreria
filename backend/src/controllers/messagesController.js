import e from "express";
import Message from "../models/Message.js";
import User from "../models/user.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message } = req.body;
    const sender_id = req.user.id;
    if (!receiver_id || !message) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    if (receiver_id === sender_id) {
      return res
        .status(400)
        .json({ error: "No se puede enviar un mensaje a ti mismo" });
    }
    const receiver_verified = await User.findByPk(receiver_id);
    if (!receiver_verified) {
      return res.status(400).json({ error: "El receptor no existe" });
    }
    const newMessage = await Message.create({
      sender_id,
      receiver_id,
      message,
    });


    
    res
      .status(201)
      .json({ message: "mensaje enviado correctamente", data: newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al enviar mensaje" });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const message = await Message.findAll({
      where: { receiver_id: user_id },
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res
      .status(200)
      .json({ message: "mensajes obtenidos correctamente", data: message });
  } catch (error) {
    res.status(500).json({ error: "error al obtener los mensajes" });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const message = await Message.findOne({
      where: { id, receiver_id: user_id },
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "email"] },
      ],
    });

    if (!message) {
      return res.status(404).json({ error: "El mensaje no existe" });
    }
    res.status(200).json({ data: message });
  } catch (error) {
    res.status(500).json({ error: "error al obtener el mensaje" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const message = await Message.findOne({
      where: { id, receiver_id: user_id },
    });
    if (!message) {
      return res.status(404).json({ error: "El mensaje no existe" });
    }
    await message.update({ read: true });
    res.status(200).json({ message: "El mensaje ha sido marcado como leído" });
  } catch (error) {
    res.status(500).json({ error: "error al marcar el mensaje como leído" });
  }
};
 