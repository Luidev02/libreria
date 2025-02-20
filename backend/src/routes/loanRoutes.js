import { Router } from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
} from "../controllers/loanController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/",authenticate,authorize(["admin"]), getAllLoans);

router.get("/:id",authenticate,authorize(["user"]), getLoanById);

router.post("/newLoan",authenticate,authorize(["user"]), createLoan);

router.put("/update/:id",authenticate,authorize(["admin"]), updateLoan);

router.delete("/delete/:id",authenticate,authorize(["admin"]), deleteLoan);

export default router;
