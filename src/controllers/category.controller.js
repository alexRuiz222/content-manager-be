const { validationResult } = require("express-validator");
const { Category } = require("../models");

getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching categories");
  }
};
getCategory = async (req, res) => {
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
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Category not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

createCategory = async (req, res) => {
  try {
    Category.create(req.body).then((category) => {
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Category created",
        data: category,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

updateCategory =async (req, res) => {
    try {
      const { name, type } = req.body;
      const [updateCategory] = await Category.update(
        {
          name,
          type,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (updateCategory === 0) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Category not found",
        });
      }
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Category updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        status: 500,
        message: "Error updating category",
      });
    }
  }

  deleteCategory = (req, res) => {
    try {
      const category = Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        ok: true,
        status: 200,
        message: "Category deleted"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        status: 500,
        message: "Error deleting category",
      });
    }
  };

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
