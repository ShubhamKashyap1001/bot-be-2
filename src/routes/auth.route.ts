import { Router } from "express";
import { register, login ,deleteAccount } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
