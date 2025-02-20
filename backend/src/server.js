import app from "./app.js";
import { sequelize } from "./config/db.js";


const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada!");

    app.listen(port, () => {
      console.log(`server corriendo en el puerto: ${port}`);
    });
  } catch (error) {
    console.log("Error al conectar base de datos", error);
    process.exit(1);
  }
};

startServer();
