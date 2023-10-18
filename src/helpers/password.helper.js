const bcrypt = require("bcrypt");

/**
 * Encrypts a password using bcrypt.
 *
 * @param {string} password - The password to be encrypted.
 * @returns {Promise<string>} A promise that resolves to the encrypted password.
 */
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = {
  encryptPassword,
};
