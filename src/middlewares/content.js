const { CategoriesPerTopic } = require("../models"); // Importa el modelo adecuado
const { Category } = require("../models");
// Check if the Topic can manage the Category
const checkCategoryAllowed = async (req, res, next) => {
  try {
    const { CategoryId, TopicId } = req.body;
    const categoryAllowed = await CategoriesPerTopic.findOne({
      where: { CategoryId, TopicId },
    });

    if (!categoryAllowed) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Category not allowed for this topic",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Check if the request is valid fot the Category
const checkContentAllowed = async (req, res, next) => {
  try {
    const allowedTypes = [];
    const foundTypes = [];
    const { file } = req;
    const { TopicId, CategoryId, Url } = req.body;
    if (!Url && !file) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Content not found",
      });
    }
    if (Url) {
      foundTypes.push("URL_VIDEO");
    }
    if (file && file.mimetype.includes("image")) {
      foundTypes.push("IMAGE");
    }

    if (file && file.mimetype.includes("text")) {
      foundTypes.push("TEXT");
    }
    // get categories by topicId
    const categories = await CategoriesPerTopic.findAll({
      where: { TopicId, CategoryId },
      include: [
        {
          model: Category,
        },
      ],
    });
    for (const category of categories) {
      allowedTypes.push(category.Category.dataValues.Type);
    }
    // console.log(allowedTypes, foundTypes);

    if (!allowedTypes.some((el) => foundTypes.includes(el))) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Content not allowed for this topic",
      });
    }

    // set the first accepted and found
    for (const type of allowedTypes) {
      if (foundTypes.includes(type)) {
        req.contentType = type;
        break;
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { checkCategoryAllowed, checkContentAllowed };
