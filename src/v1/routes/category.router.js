const { Router } = require("express");
const authenticateToken = require("../../middlewares/auth");
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const { validateId } = require("../../middlewares");

const router = Router();

// GET /categories
router.get("/", authenticateToken, getCategories);

// Get Category by ID
router.get("/:id", authenticateToken, validateId, getCategory);

// POST /category
router.post("/", authenticateToken, createCategory);

// PUT /category/:id
router.put("/:id", authenticateToken, updateCategory);

// DELETE /category/:id
router.delete("/:id", authenticateToken, deleteCategory);

module.exports = router;
