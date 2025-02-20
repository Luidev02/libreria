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

dotenv.config();
const app = express();


// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages",messageRoutes)


export default app;
