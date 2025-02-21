import { Router } from "express";
import {
  getloanReports,
  getUsersReports,
} from "../controllers/reportController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/loans", authenticate, authorize(["admin"]), getloanReports);
router.get("/users", authenticate, authorize(["admin"]), getUsersReports);


export default router;
