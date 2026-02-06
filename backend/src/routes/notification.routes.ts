import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { getNotifications } from "../services/notification.service";

const router = Router();

router.use(authMiddleware);

/** GET /api/notifications — list notifications for current user */
router.get("/", (req: AuthRequest, res: Response) => {
  const items = getNotifications(req.userId!);
  res.json(items);
});

export default router;
