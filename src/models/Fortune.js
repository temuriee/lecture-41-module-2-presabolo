import mongoose from "mongoose";

const fortuneSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Fortune", fortuneSchema);
