const { Router } = require("express");
const authenticateToken = require("../../middlewares/auth");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");
const { validateId } = require("../../middlewares");

const router = Router();

// GET /users
router.get("/", authenticateToken, getUsers);

// Get User by ID
router.get("/:id", [authenticateToken, validateId], getUser);

// POST /user
router.post("/", authenticateToken, createUser);

// PUT /user/:id
router.put("/:id", authenticateToken, updateUser);

// DELETE /user/:id
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
