import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);



export { sequelize };

// sincronización de la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log(" Base de datos sincronizada correctamente");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
}

// syncDatabase();