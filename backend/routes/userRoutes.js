import express from "express";
import { getUserById, getPrivateUserById } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public user lookup (no password)
router.get("/:id", getUserById);

// Protected private lookup (must be the same user)
router.get("/private/:id", authMiddleware, getPrivateUserById);

export default router;
