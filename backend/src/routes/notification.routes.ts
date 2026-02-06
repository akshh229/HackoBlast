import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { getNotifications } from "../services/notification.service";

const router = Router();

router.use(authMiddleware);

/** GET /api/notifications — list notifications for current user */
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const items = await getNotifications(req.userId!);
    res.json(items);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
