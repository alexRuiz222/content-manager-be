const { Router } = require("express");

const {
  registerUser,
  loginUser,
} = require("../../controllers/auth.controller");

const router = Router();

// POST /register
router.post("/register", registerUser);

// POST /login
router.post("/login", loginUser);

module.exports = router;
