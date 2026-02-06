import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Mail } from "../models/Mail.model";
import { summarizeMail } from "../services/ai.service";
import { pushNotification } from "../services/notification.service";

/** POST /api/mail/summarize — accepts { text } and returns AI summary */
export const summarize = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "text is required" });
      return;
    }

    const result = await summarizeMail(text);

    // Persist the summarised mail
    const mail = await Mail.create({
      userId: req.userId,
      rawText: text,
      summary: result.summary,
      category: result.category,
      urgency: result.urgency,
    });

    // Push a notification if urgent (await so rejections are caught)
    if (result.urgency === "high") {
      try {
        pushNotification(req.userId!, "🚨 You have an urgent email!");
      } catch (notifErr) {
        console.error(`Notification failed for user ${req.userId}:`, notifErr);
      }
    }

    res.json({ mail, ai: result });
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ error: "Summarization failed" });
  }
};

/** GET /api/mail — list all summarised mails for the user */
export const listMails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const mails = await Mail.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(mails);
  } catch (err) {
    console.error("Failed to fetch mails:", err);
    res.status(500).json({ error: "Failed to fetch mails" });
  }
};
