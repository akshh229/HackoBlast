import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Timetable } from "../models/Timetable.model";
import { generateTimetableInsights } from "../services/ai.service";

/** Fields that clients are allowed to update */
const UPDATABLE_FIELDS = ["title", "day", "startTime", "endTime"] as const;

/** GET /api/timetable */
export const getEntries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const entries = await Timetable.find({ userId: req.userId }).sort({ day: 1, startTime: 1 });
    res.json(entries);
  } catch (err) {
    console.error("Failed to fetch timetable:", err);
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
};

/** POST /api/timetable */
export const addEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, day, startTime, endTime } = req.body;
    const entry = await Timetable.create({ userId: req.userId, title, day, startTime, endTime });
    res.status(201).json(entry);
  } catch (err) {
    console.error("Failed to create timetable entry:", err);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

/** PUT /api/timetable/:id */
export const updateEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Only allow whitelisted fields to be updated
    const updatePayload: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        updatePayload[field] = req.body[field];
      }
    }

    const entry = await Timetable.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updatePayload,
      { new: true }
    );
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }
    res.json(entry);
  } catch (err) {
    console.error("Failed to update timetable entry:", err);
    res.status(500).json({ error: "Failed to update entry" });
  }
};

/** DELETE /api/timetable/:id */
export const deleteEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const entry = await Timetable.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Failed to delete timetable entry:", err);
    res.status(500).json({ error: "Failed to delete entry" });
  }
};

/** GET /api/timetable/insights — AI-powered preparation tips for today */
export const getInsights = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const entries = await Timetable.find({ userId: req.userId }).sort({ day: 1, startTime: 1 });
    const insights = await generateTimetableInsights(
      entries.map((e) => ({
        title: e.title,
        day: e.day,
        startTime: e.startTime,
        endTime: e.endTime,
      }))
    );
    res.json(insights);
  } catch (err) {
    console.error("Failed to generate timetable insights:", err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
};
