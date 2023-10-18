const { validationResult } = require("express-validator");
const { encryptPassword } = require("../helpers/password.helper");
const { User, Role } = require("../models");

getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["Password"] },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching users");
  }
};
getUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      status: 400,
      errors: errors.array(),
    });
  }

  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Role,
        },
      ],
      attributes: { exclude: ["Password"] },
    });
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

createUser = async (req, res) => {
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
    res.status(201).json({
      ok: true,
      status: 201,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const [updateUser] = await User.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateUser === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: "User updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Error updating user",
    });
  }
};

deleteUser = (req, res) => {
  try {
    const user = User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Error deleting user",
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
