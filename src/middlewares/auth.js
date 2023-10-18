const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "secret";
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { userId, roleId } = user;
    req.user = {
      userId,
      roleId,
    };
    next();
  });
};

module.exports = authenticateToken;
