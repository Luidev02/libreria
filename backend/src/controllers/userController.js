import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
      verified: false,
    });

    const verificationUser = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const verificationUrl = `http://localhost:3000/api/users/verify/${verificationUser}`;
    await sendEmail(
      email,
      "Verifica tu cuenta",
      `<p>Hola ${name},</p>
             <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
             <a href="${verificationUrl}">Verificar cuenta</a>`
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error en el registro" });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Token de verificación inválido" });
    }
    const decodedToken = jwt.verify(id, process.env.JWT_SECRET);
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (user.verified) {
      return res.status(400).json({ error: "La cuenta ya está verificada" });
    }
    await user.update({ verified: true });

    await sendEmail(
      user.email,
      "Cuenta verificada",
      ` Hola ${user.name}, <br>
      Gracias por verificar tu cuenta. Ahora puedes iniciar sesión en la plataforma.`
    );

    res.json({ message: "Cuenta verificada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hubo un error en la verificación de la cuenta" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !user.verified) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o no verificado" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error en el login" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { name, email, password } = req.body;
    if (email && email !== user.email) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
      await user.save();
      await sendEmail(
        user.email,
        "Contraseña actualizada",
        ` Hola ${user.name}, <br>
        Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión en la plataforma.`
      );
    }

    await user.update({ name, email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hubo un error en la actualización del usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (id !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No puedes eliminar esta cuenta cuenta" });
    }
    await user.destroy();
    sendEmail(
      user.email,
      "Cuenta eliminada",
      ` Hola ${user.name}, <br>
      Tu cuenta ha sido eliminada. Si tienes alguna pregunta o consulta, no dudes en contactar con nosotros.`
    );
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hubo un error en la eliminación del usuario" });
  }
};


export const googleAuth = async (req, res) => {
  const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Autenticación con Google exitosa", token });
};