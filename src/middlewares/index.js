const { check } = require("express-validator");
const validateId = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number"),
];

module.exports = {
  validateId,
};
