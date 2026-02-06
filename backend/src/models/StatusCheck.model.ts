import mongoose, { Schema, Document } from "mongoose";

export interface IStatusCheck extends Document {
  id: string; // UUID
  client_name: string;
  timestamp: Date;
}

const StatusCheckSchema = new Schema<IStatusCheck>(
  {
    id: { type: String, required: true, unique: true },
    client_name: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  {
    // Don't create a separate createdAt/updatedAt — the doc's own "timestamp" is the record time
    versionKey: false,
  }
);

export const StatusCheck = mongoose.model<IStatusCheck>("StatusCheck", StatusCheckSchema);
