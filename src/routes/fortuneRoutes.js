import express from "express";
import Fortune from "../models/Fortune.js";
import FortuneTemplate from "../models/FortuneTemplate.js";

const router = express.Router();

/**
 * ✅ GET /api/fortune/all
 * Returns all fortunes
 */
router.get("/", async (req, res) => {
  try {
    // Fetch all fortunes from DB, sorted by creation date (newest first)
    const fortunes = await Fortune.find().sort({ createdAt: -1 });
    res.status(200).json(fortunes);
  } catch (error) {
    console.error("Error fetching fortunes:", error);
    res.status(500).json({ message: "Server error while fetching fortunes" });
  }
});

/** * 🔍 GET /api/fortune/templates
 * Returns all fortune templates
 */

router.get("/templates", async (req, res) => {
  try {
    const templates = await FortuneTemplate.find().sort({ createdAt: -1 });

    if (templates.length === 0) {
      return res.status(404).json({ message: "No fortune templates found." });
    }

    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching fortune templates:", error);
    res.status(500).json({ message: "Server error while fetching templates" });
  }
});

/**
 * 🎲 GET /api/fortune/random
 * Returns one random fortune from DB
 */
router.get("/random", async (req, res) => {
  try {
    // 🧠 Use MongoDB aggregation to get 1 random document
    const randomFortune = await FortuneTemplate.aggregate([
      { $sample: { size: 1 } },
    ]);

    if (randomFortune.length === 0) {
      return res
        .status(404)
        .json({ message: "No fortunes found in the database." });
    }

    res.status(200).json(randomFortune[0]);
  } catch (error) {
    console.error("Error fetching random fortune:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching random fortune" });
  }
});

/**
 * 💾 POST /api/fortune/save
 * Saves a user's name and fortune text
 */

// {
//   "name": "Nika",
//   "text": "You will code something awesome today 💻✨"
// }

router.post("/save", async (req, res) => {
  try {
    const { name, text } = req.body;

    // Basic validation
    if (!text) {
      return res.status(400).json({ message: "Fortune text is required." });
    }

    const newFortune = new Fortune({ name, text });
    const savedFortune = await newFortune.save();

    res.status(201).json({
      message: "Fortune saved!",
      saved: savedFortune,
    });
  } catch (error) {
    console.error("Error saving fortune:", error);
    res.status(500).json({ message: "Server error while saving fortune" });
  }
});

/**
 * 🔍 GET /api/fortune/:id
 * Returns a specific fortune by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const fortune = await Fortune.findById(req.params.id);

    if (!fortune) {
      return res.status(404).json({ message: "Fortune not found." });
    }

    res.status(200).json(fortune);
  } catch (error) {
    console.error("Error fetching fortune:", error);
    res.status(500).json({ message: "Server error while fetching fortune" });
  }
});

/**
 * ❌ DELETE /api/fortune/:id
 * Deletes a fortune by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Fortune.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Fortune not found." });
    }

    res.status(200).json({ message: "Fortune deleted successfully." });
  } catch (error) {
    console.error("Error deleting fortune:", error);
    res.status(500).json({ message: "Server error while deleting fortune" });
  }
});

/**
 * 🆕 POST /api/fortune/create
 * Adds a new fortune to the general pool (text only)
 */

// {
//   "text": "Your code will inspire others 🚀"
// }

router.post("/create", async (req, res) => {
  try {
    console.log("Incoming body:", req.body); // 👈 add this line

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Fortune text is required." });
    }

    const newTemplate = new FortuneTemplate({ text });
    const created = await newTemplate.save();

    res.status(201).json({
      message: "New fortune template created successfully!",
      created,
    });
  } catch (error) {
    console.error("Error creating fortune template:", error);
    res.status(500).json({ message: "Server error while creating template" });
  }
});

export default router;
