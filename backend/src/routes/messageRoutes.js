import { Router } from "express";
import { getMessageById, getUserMessages, markAsRead, sendMessage } from "../controllers/messagesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/messages",authenticate,sendMessage);
router.get("/messages", authenticate, getUserMessages);
router.get("/messages/:id",authenticate,getMessageById);
router.patch("/messages/:id/read", authenticate, markAsRead);

export default router;