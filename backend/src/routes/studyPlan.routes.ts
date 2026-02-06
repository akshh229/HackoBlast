import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPlan } from "../controllers/studyPlan.controller";

const router = Router();

router.use(authMiddleware);
router.post("/", createPlan);

export default router;
