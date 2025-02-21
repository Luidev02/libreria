import { Router } from "express";
import {
  createGender,
  deleteGender,
  getGenderById,
  getGenders,
  updateGender,
} from "../controllers/genderController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", getGenders);

router.get("/:id", getGenderById);

router.post("/new-gender", authenticate, authorize(["admin"]), createGender);

router.put(
  "/update-gender/:id",
  authenticate,
  authorize(["admin"]),
  updateGender
);

router.delete(
  "/delete-gender/:id",
  authenticate,
  authorize(["admin"]),
  deleteGender
);

export default router;
