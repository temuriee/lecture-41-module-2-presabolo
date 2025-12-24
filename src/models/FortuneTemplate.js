import mongoose from "mongoose";

const fortuneTemplateSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("FortuneTemplate", fortuneTemplateSchema);
