import { Router } from "express";
import passport from "passport";
import {
  deleteUser,
  googleAuth,
  login,
  register,
  updateUser,
  verifyAccount,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import "../config/passport.js";
import { loginLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = Router();

router.post("/register", register);
router.get("/verify/:id", verifyAccount);
router.post("/login", loginLimiter, login);
router.delete("/delete/:id", authenticate, deleteUser);
router.put("/update/:id", authenticate, updateUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

export default router;
