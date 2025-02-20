import { Router } from "express";
import { getMessageById, getUserMessages, markAsRead, sendMessage } from "../controllers/messagesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/",authenticate,sendMessage);
router.get("/", authenticate, getUserMessages);
router.get("/:id",authenticate,getMessageById);
router.patch("/:id/read", authenticate, markAsRead);

export default router;