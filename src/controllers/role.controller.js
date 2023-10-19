const { Role } = require("../models");
getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      data: roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching roles");
  }
};

module.exports = {
  getRoles,
};
