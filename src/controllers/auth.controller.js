const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../helpers/password.helper");
const { User, Role } = require("../models");
const secretKey = process.env.SECRET_KEY || "secret";
const tokenExpiration = process.env.TOKEN_EXPIRATION || "1h";
registerUser = async (req, res) => {
  try {
    const { Username, Email, RoleId, Password } = req.body;
    const newPass = await encryptPassword(Password);
    const user = await User.create({
      Username,
      Email,
      RoleId,
      Password: newPass,
    });

    const newUser = await User.findOne({
      where: { id: user.id },
      include: Role,
      attributes: { exclude: ["Password"] },
    });

    // Create token
    const token = jwt.sign({ userId: user.id, roleId: user.RoleId }, secretKey, {expiresIn: tokenExpiration});

    res.status(201).json({
      ok: true,
      status: 201,
      message: "User already created",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error on user registration");
  }
};

loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await User.findOne({ where: { Username } });

    if (!user) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Username or password invalid",
      });
    }

    const isValidPassword = await bcrypt.compare(Password, user.Password);

    if (!isValidPassword) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Username or password invalid",
      });
    }

    // Create token authentication
    const token = jwt.sign({ userId: user.id, roleId: user.RoleId }, secretKey , {expiresIn: tokenExpiration});

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Session created",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};
module.exports = {
  registerUser,
  loginUser,
};
