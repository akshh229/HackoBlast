import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { StatusCheck } from "../models/StatusCheck.model";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * POST /api/status — Create a new status check.
 * Body: { client_name: string }
 */
export const createStatusCheck = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { client_name } = req.body;

    if (!client_name || typeof client_name !== "string" || !client_name.trim()) {
      res.status(400).json({ error: "client_name is required" });
      return;
    }

    const doc = await StatusCheck.create({
      id: randomUUID(),
      client_name: client_name.trim(),
      timestamp: new Date(),
    });

    res.status(201).json({
      id: doc.id,
      client_name: doc.client_name,
      timestamp: doc.timestamp.toISOString(),
    });
  } catch (err) {
    console.error("createStatusCheck error:", err);
    res.status(500).json({ error: "Failed to create status check" });
  }
};

/**
 * GET /api/status — List all status checks (newest first).
 */
export const getStatusChecks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const checks = await StatusCheck.find({}, { _id: 0 })
      .sort({ timestamp: -1 })
      .lean();

    res.json(
      checks.map((c) => ({
        id: c.id,
        client_name: c.client_name,
        timestamp:
          c.timestamp instanceof Date
            ? c.timestamp.toISOString()
            : c.timestamp,
      }))
    );
  } catch (err) {
    console.error("getStatusChecks error:", err);
    res.status(500).json({ error: "Failed to retrieve status checks" });
  }
};
