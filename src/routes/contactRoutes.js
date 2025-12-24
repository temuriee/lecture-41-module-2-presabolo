import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/**
 * ✅ POST /api/contact
 * Submit contact message
 */
router.post("/", async (req, res) => {
  try {
    const { name = "", email, subject = "", message } = req.body;

    if (!email || !message) {
      return res
        .status(400)
        .json({ message: "Email and message are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ GET /api/contact/all
 * Get all contact messages (admin)
 */
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ PATCH /api/contact/:id/read
 * Mark message as read
 */
router.patch("/:id/read", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ DELETE /api/contact/:id
 * Delete contact message
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Contact message deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
