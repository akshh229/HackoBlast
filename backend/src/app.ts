import express from "express";
import cors from "cors";

// Route imports
import authRoutes from "./routes/auth.routes";
import mailRoutes from "./routes/mail.routes";
import studyPlanRoutes from "./routes/studyPlan.routes";
import timetableRoutes from "./routes/timetable.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();

// ── Global middleware ──────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ───────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "ok", project: "HackoBlast API" });
});

// ── API routes ─────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
