import { Router } from "express";
import {
  createLoan,
  createLoanPerUser,
  deleteLoan,
  getAllLoans,
  getAllLoansPerUser,
  getLoanById,
  updateLoan,
} from "../controllers/loanController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/",authenticate,authorize(["admin"]), getAllLoans);

router.get("/user", authenticate, getAllLoansPerUser);

router.get("/:id",authenticate,authorize(["user"]), getLoanById);

router.post("/newLoan", authenticate,authorize(["admin"]),createLoan);

router.post("/new/user",authenticate,createLoanPerUser)

router.put("/update/:id",authenticate,authorize(["admin"]), updateLoan);

router.delete("/delete/:id",authenticate,authorize(["admin"]), deleteLoan);

export default router;
