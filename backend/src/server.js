import app from "./app.js";
import { sequelize } from "./config/db.js";
import { setupSocket } from "./websockets/socketHandler.js";
import { initSocket } from "./websockets/socketInstance.js";



const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos OK.");

    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto :${PORT}`);
    });

    const io = initSocket(server);
    setupSocket(io);

  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
};

startServer();