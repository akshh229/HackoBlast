import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { generateStudyPlan } from "../services/ai.service";

/** POST /api/study-plan — accepts { subjects, hoursPerDay } */
export const createPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subjects, hoursPerDay } = req.body;
    if (!subjects || !hoursPerDay) {
      res.status(400).json({ error: "subjects and hoursPerDay are required" });
      return;
    }

    const plan = await generateStudyPlan({ subjects, hoursPerDay });
    res.json({ userId: req.userId, plan });
  } catch (err) {
    console.error("Study plan generation error:", err);
    res.status(500).json({ error: "Plan generation failed" });
  }
};
