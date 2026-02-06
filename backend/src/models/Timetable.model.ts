import mongoose, { Schema, Document } from "mongoose";

export interface ITimetableEntry extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  day: string; // e.g. "Monday"
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema = new Schema<ITimetableEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

export const Timetable = mongoose.model<ITimetableEntry>("Timetable", TimetableSchema);
