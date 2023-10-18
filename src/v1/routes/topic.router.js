const { Router } = require("express");
const authenticateToken = require("../../middlewares/auth");
const {
  getTopic,
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../../controllers/topic.controller");
const { validateId } = require("../../middlewares");

const router = Router();

// GET /topics
router.get("/", authenticateToken, getTopics);

// Get Topic by ID
router.get("/:id", [authenticateToken, validateId], getTopic);

// POST /topic
router.post("/", authenticateToken, createTopic);

// PUT /topic/:id
router.put("/:id", authenticateToken, updateTopic);

// DELETE /topic/:id
router.delete("/:id", authenticateToken, deleteTopic);

module.exports = router;
