import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Mostrar logs en consola
        new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }), // Errores críticos
        new winston.transports.File({ filename: path.join(__dirname, '../logs/combined.log') }) // Todos los logs
      ],
});

export default logger;
