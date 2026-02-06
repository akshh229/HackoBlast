/**
 * seed.ts — Populate MongoDB with demo data for the HackoBlast project.
 *
 * Run:  npx ts-node src/seed.ts
 *
 * Creates (or reuses) a demo user and inserts sample mails + timetable entries.
 * Safe to re-run: existing demo mails & timetable are cleared before insert.
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.model";
import { Mail } from "./models/Mail.model";
import { Timetable } from "./models/Timetable.model";
import { StatusCheck } from "./models/StatusCheck.model";

const DEMO_EMAIL = "demo@hackoblast.dev";
const DEMO_PASSWORD = "demo123456";
const DEMO_NAME = "Demo User";

// ── Demo Mails ────────────────────────────────────────────
const demoMails = [
  {
    rawText:
      "Dear students, your Mid-Semester Examination for Data Structures (CS201) has been rescheduled to Friday, Feb 13. Please check the updated seating arrangement on the portal.",
    summary:
      "Mid-sem exam for Data Structures rescheduled to Friday Feb 13. Check portal for seating.",
    category: "academic",
    urgency: "high" as const,
  },
  {
    rawText:
      "Reminder: The deadline for submitting your DBMS Lab Assignment #4 (Normalization) is tomorrow, Feb 7, 11:59 PM. Late submissions will not be accepted.",
    summary:
      "DBMS Lab Assignment #4 due tomorrow (Feb 7) by 11:59 PM. No late submissions.",
    category: "academic",
    urgency: "high" as const,
  },
  {
    rawText:
      "Hi all, the ACM Student Chapter is hosting a workshop on Competitive Programming this Saturday from 10 AM to 1 PM in LH-301. Beginners welcome!",
    summary:
      "ACM workshop on Competitive Programming — Saturday 10 AM–1 PM, LH-301.",
    category: "event",
    urgency: "medium" as const,
  },
  {
    rawText:
      "The library will remain closed on Feb 10 (Monday) for maintenance. Digital resources on the portal are still available.",
    summary:
      "Library closed Feb 10 for maintenance. Digital resources accessible online.",
    category: "general",
    urgency: "low" as const,
  },
  {
    rawText:
      "Dear student, your hostel fee for the Spring semester is overdue. Please clear the dues by Feb 15 to avoid a late penalty.",
    summary:
      "Hostel fee overdue — pay by Feb 15 to avoid late penalty.",
    category: "finance",
    urgency: "high" as const,
  },
  {
    rawText:
      "The placement cell has shared a new internship opportunity with Google Summer of Code 2026. Eligible students can apply through the portal before Feb 20.",
    summary:
      "GSoC 2026 internship opportunity — apply on portal before Feb 20.",
    category: "career",
    urgency: "medium" as const,
  },
  {
    rawText:
      "Good news! The campus Wi-Fi has been upgraded to support Wi-Fi 6E. You may need to reconnect your devices to the new SSID: CampusNet-6E.",
    summary:
      "Campus Wi-Fi upgraded to Wi-Fi 6E. Reconnect using SSID CampusNet-6E.",
    category: "general",
    urgency: "low" as const,
  },
  {
    rawText:
      "Prof. Sharma's Operating Systems class on Thursday is cancelled. A make-up lecture will be held on Saturday at 9 AM in LH-204.",
    summary:
      "OS class cancelled Thursday. Make-up lecture Saturday 9 AM, LH-204.",
    category: "academic",
    urgency: "medium" as const,
  },
];

// ── Demo Timetable (full week) ────────────────────────────
const demoTimetable = [
  // Monday
  { title: "Data Structures", day: "Monday", startTime: "09:00", endTime: "10:00" },
  { title: "Operating Systems", day: "Monday", startTime: "10:00", endTime: "11:00" },
  { title: "DBMS Lab", day: "Monday", startTime: "11:15", endTime: "12:45" },
  { title: "Computer Networks", day: "Monday", startTime: "14:00", endTime: "15:00" },
  { title: "Software Engineering", day: "Monday", startTime: "15:00", endTime: "16:00" },

  // Tuesday
  { title: "Mathematics III", day: "Tuesday", startTime: "09:00", endTime: "10:00" },
  { title: "Data Structures Lab", day: "Tuesday", startTime: "10:15", endTime: "11:45" },
  { title: "Computer Networks", day: "Tuesday", startTime: "13:00", endTime: "14:00" },
  { title: "Operating Systems", day: "Tuesday", startTime: "14:00", endTime: "15:00" },

  // Wednesday
  { title: "Data Structures", day: "Wednesday", startTime: "09:00", endTime: "10:00" },
  { title: "Software Engineering", day: "Wednesday", startTime: "10:00", endTime: "11:00" },
  { title: "DBMS", day: "Wednesday", startTime: "11:15", endTime: "12:15" },
  { title: "Computer Networks Lab", day: "Wednesday", startTime: "14:00", endTime: "15:30" },

  // Thursday
  { title: "Operating Systems", day: "Thursday", startTime: "09:00", endTime: "10:00" },
  { title: "Mathematics III", day: "Thursday", startTime: "10:00", endTime: "11:00" },
  { title: "Data Structures", day: "Thursday", startTime: "11:15", endTime: "12:15" },
  { title: "Software Engineering Lab", day: "Thursday", startTime: "14:00", endTime: "15:30" },

  // Friday
  { title: "DBMS", day: "Friday", startTime: "09:00", endTime: "10:00" },
  { title: "Computer Networks", day: "Friday", startTime: "10:00", endTime: "11:00" },
  { title: "Operating Systems Lab", day: "Friday", startTime: "11:15", endTime: "12:45" },
  { title: "Mathematics III", day: "Friday", startTime: "14:00", endTime: "15:00" },

  // Saturday (make-up / optional)
  { title: "OS Make-up Lecture", day: "Saturday", startTime: "09:00", endTime: "10:00" },
  { title: "ACM CP Workshop", day: "Saturday", startTime: "10:00", endTime: "13:00" },
];

// ── Demo Status Checks ───────────────────────────────────
import { randomUUID } from "crypto";

const demoStatusChecks = [
  { id: randomUUID(), client_name: "HackoBlast Web App",       timestamp: new Date("2026-02-06T08:00:00Z") },
  { id: randomUUID(), client_name: "HackoBlast Web App",       timestamp: new Date("2026-02-06T08:15:00Z") },
  { id: randomUUID(), client_name: "HackoBlast Mobile Client", timestamp: new Date("2026-02-06T08:30:00Z") },
  { id: randomUUID(), client_name: "HackoBlast AI Service",    timestamp: new Date("2026-02-06T09:00:00Z") },
  { id: randomUUID(), client_name: "HackoBlast Web App",       timestamp: new Date("2026-02-06T09:15:00Z") },
  { id: randomUUID(), client_name: "HackoBlast Mobile Client", timestamp: new Date("2026-02-06T09:45:00Z") },
  { id: randomUUID(), client_name: "HackoBlast API Gateway",   timestamp: new Date("2026-02-06T10:00:00Z") },
  { id: randomUUID(), client_name: "HackoBlast AI Service",    timestamp: new Date("2026-02-06T10:30:00Z") },
  { id: randomUUID(), client_name: "HackoBlast Web App",       timestamp: new Date("2026-02-06T11:00:00Z") },
  { id: randomUUID(), client_name: "HackoBlast API Gateway",   timestamp: new Date("2026-02-06T11:30:00Z") },
];

// ── Main ──────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/hackoblast";
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected for seeding");

  // 1. Upsert demo user
  let user = await User.findOne({ email: DEMO_EMAIL });
  if (!user) {
    const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);
    user = await User.create({
      name: DEMO_NAME,
      email: DEMO_EMAIL,
      password: hashed,
    });
    console.log("👤 Created demo user:", user.email);
  } else {
    console.log("👤 Demo user already exists:", user.email);
  }

  const userId = user._id;

  // 2. Clear existing demo data & insert fresh
  const mailDel = await Mail.deleteMany({ userId });
  console.log(`🗑️  Cleared ${mailDel.deletedCount} old demo mails`);

  const insertedMails = await Mail.insertMany(
    demoMails.map((m) => ({ ...m, userId }))
  );
  console.log(`✉️  Inserted ${insertedMails.length} demo mails`);

  const ttDel = await Timetable.deleteMany({ userId });
  console.log(`🗑️  Cleared ${ttDel.deletedCount} old demo timetable entries`);

  const insertedTT = await Timetable.insertMany(
    demoTimetable.map((t) => ({ ...t, userId }))
  );
  console.log(`🗓️  Inserted ${insertedTT.length} demo timetable entries`);

  // 2b. Seed status checks
  const scDel = await StatusCheck.deleteMany({});
  console.log(`🗑️  Cleared ${scDel.deletedCount} old demo status checks`);

  const insertedSC = await StatusCheck.insertMany(demoStatusChecks);
  console.log(`📡 Inserted ${insertedSC.length} demo status checks`);

  // 3. Summary
  console.log("\n🎉 Seed complete! Demo data summary:");
  console.log(`   User  : ${user.name} <${user.email}>`);
  console.log(`   Mails : ${insertedMails.length}`);
  console.log(`   Timetable slots: ${insertedTT.length}`);
  console.log(`   Status checks  : ${insertedSC.length}`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
