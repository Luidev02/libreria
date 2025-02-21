import  { Router } from "express";

import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getfilterBooks,
  updateBook,
  uploadBookImage,
} from "../controllers/bookController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import upload from "../config/multerConfig.js";

const router = Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.get("/s/search", getfilterBooks);

router.post("/newBook", authenticate, authorize(["admin"]), createBook);

router.post("/upload/image/:id", authenticate, upload.single("image"), uploadBookImage);


router.put("/updateBook/:id", authenticate, authorize(["admin"]), updateBook);

router.delete(
  "/deleteBook/:id",
  authenticate,
  authorize(["admin"]),
  deleteBook
);

export default router;
