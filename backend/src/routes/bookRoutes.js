import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/newBook",authenticate,authorize(["admin"]),createBook);

router.put("/updateBook/:id",authenticate,authorize(["admin"]), updateBook);

router.delete("/deleteBook/:id",authenticate,authorize(["admin"]), deleteBook);

export default router;
