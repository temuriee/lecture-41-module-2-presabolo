import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fortuneRoutes from "./routes/fortuneRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// ✅ MongoDB connection with try/catch
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails
  }
}
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("🧠 Fortune Cookie API is running!");
});

// ✅ Use routes
app.use("/api/fortune", fortuneRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
