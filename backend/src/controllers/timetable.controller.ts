import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Timetable } from "../models/Timetable.model";

/** GET /api/timetable */
export const getEntries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const entries = await Timetable.find({ userId: req.userId }).sort({ day: 1, startTime: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch timetable", details: err });
  }
};

/** POST /api/timetable */
export const addEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, day, startTime, endTime } = req.body;
    const entry = await Timetable.create({ userId: req.userId, title, day, startTime, endTime });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to create entry", details: err });
  }
};

/** PUT /api/timetable/:id */
export const updateEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const entry = await Timetable.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update entry", details: err });
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
    res.status(500).json({ error: "Failed to delete entry", details: err });
  }
};
