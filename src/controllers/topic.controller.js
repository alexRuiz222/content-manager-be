const { validationResult } = require("express-validator");
const { Topic, CategoriesPerTopic, Category } = require("../models");

getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      data: topics,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching topics");
  }
};
getTopic = async (req, res) => {
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
    const topic = await Topic.findByPk(id);
    if (!topic) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Topic not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: topic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

createTopic = async (req, res) => {
  try {
    const { categories, name } = req.body;
    const topic = await Topic.create({ name });
    if (topic && categories) {
      const { id } = topic;
      // insert categories per topics
      for (const categoryId of categories) {
        await CategoriesPerTopic.create({ TopicId: id, CategoryId });
      }
    }
    const newTopic = await Topic.findByPk(topic.id, {
      include: [
        {
          model: Category,
          as: "categories", // Alias specified in the Topic model association
          through: { attributes: [] }, // Exclude any attributes from the join table
        },
      ],
    });
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Topic created",
      data: newTopic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

updateTopic = async (req, res) => {
  try {
    const { name } = req.body;
    const [updateTopic] = await Topic.update(
      {
        name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateTopic === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Topic not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Topic updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Error updating topic",
    });
  }
};

deleteTopic = (req, res) => {
  try {
    const topic = Topic.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Topic deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Error deleting topic",
    });
  }
};

module.exports = {
  getTopic,
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
};
