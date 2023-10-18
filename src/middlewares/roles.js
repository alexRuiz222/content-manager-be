const adminMiddleware = (req, res, next) => {
  const userRole = req.user.roleId;
  if (userRole === 1) {
    next();
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
};

const readerMiddleware = (req, res, next) => {
  const userRole = req.user.roleId;
  if (userRole === 2) {
    next();
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
};

const creatorMiddleware = (req, res, next) => {
  const userRole = req.user.roleId;
  if (userRole === 3) {
    next();
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
};

module.exports = {
  adminMiddleware,
  readerMiddleware,
  creatorMiddleware,
};
