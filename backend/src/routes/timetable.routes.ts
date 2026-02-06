import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry,
} from "../controllers/timetable.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", getEntries);
router.post("/", addEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
