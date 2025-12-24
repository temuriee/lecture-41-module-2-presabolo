import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

/**
 * ✅ POST /api/feedback
 * Create new feedback
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const feedback = await Feedback.create({
      name,
      email,
      message,
      rating,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    console.error("❌ ERROR MESSAGE:", error.message);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

/**
 * ✅ GET /api/feedback/all
 * Get all feedbacks
 */
router.get("/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error while fetching feedback" });
  }
});

/**
 * ✅ DELETE /api/feedback/:id
 * Delete feedback (admin use)
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error while deleting feedback" });
  }
});

export default router;
