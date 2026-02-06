import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry,
  getInsights,
} from "../controllers/timetable.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", getEntries);
router.get("/insights", getInsights);
router.post("/", addEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
