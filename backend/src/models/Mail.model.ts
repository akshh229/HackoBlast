import mongoose, { Schema, Document } from "mongoose";

export interface IMail extends Document {
  userId: mongoose.Types.ObjectId;
  rawText: string;
  summary: string;
  category: string;
  urgency: "low" | "medium" | "high";
  createdAt: Date;
}

const MailSchema = new Schema<IMail>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rawText: { type: String, required: true },
    summary: { type: String, default: "" },
    category: { type: String, default: "general" },
    urgency: { type: String, enum: ["low", "medium", "high"], default: "low" },
  },
  { timestamps: true }
);

export const Mail = mongoose.model<IMail>("Mail", MailSchema);
