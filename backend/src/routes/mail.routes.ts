import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { summarize, listMails } from "../controllers/mail.controller";

const router = Router();

router.use(authMiddleware); // all mail routes require auth
router.post("/summarize", summarize);
router.get("/", listMails);

export default router;
