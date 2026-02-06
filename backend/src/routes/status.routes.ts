import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createStatusCheck,
  getStatusChecks,
} from "../controllers/status.controller";

const router = Router();

// GET  /api/status — list all status checks (public per design doc)
router.get("/", getStatusChecks);

// POST /api/status — create a new status check (requires auth)
router.post("/", authMiddleware, createStatusCheck);

export default router;
