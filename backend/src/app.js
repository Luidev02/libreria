import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import genderRoutes from "./routes/genderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import { getLogger } from "nodemailer/lib/shared/index.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, optionsSuccessStatus: 200 
}));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    getLogger.error(`${req.method} ${req.url} - ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
app.use("/api/books", bookRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/gender", genderRoutes);
app.use("/api/images", express.static(path.join(__dirname, "uploads")));


export default app;
