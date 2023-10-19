const { Router } = require("express");
const { getRoles } = require("../../controllers/role.controller");

const router = Router();

router.get("/", getRoles);

module.exports = router;
