const { validationResult } = require("express-validator");
const { moveFile } = require("../helpers/files.helper");
const { Content, Category, Topic } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs-extra");
getContents = async (req, res) => {
  try {
    // get params to filter, if there are
    const filters = {
      where: { TopicId: { [Op.not]: null } },
    };
    const { TopicId, group } = req.query;
    if (TopicId && TopicId > 0) {
      filters.where.TopicId = TopicId;
    }

    let { count, rows: contents } = await Content.findAndCountAll(filters);
    if (group) {
      // group content by topic
      contents = contents.group((content) => content.TopicId);
    }
    res.status(200).json({
      ok: true,
      status: 200,
      count,
      data: contents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching contents");
  }
};

// getContentGroupByTopics = async (req, res) => {
//   try {
//     const contents = await Content.findAll({
//       include: [
//         {
//           model: Topic,
//         },
//       ],
//     });
//     res.status(200).json({
//       ok: true,
//       status: 200,
//       data: contents,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
getContent = async (req, res) => {
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
    const content = await Content.findByPk(id, {
      include: [
        {
          model: Category,
        },
        {
          model: Topic,
        },
      ],
    });
    if (!content) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Content not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

createContent = async (req, res) => {
  try {
    const { Title, Url, CategoryId, TopicId } = req.body;
    const { userId } = req.user;
    const { contentType } = req;

    let contentData = {};
    switch (contentType) {
      case "URL_VIDEO":
        contentData = {
          Title,
          Content: Url,
          UserId: userId,
          CategoryId,
          TopicId,
        };
        break;

      case "IMAGE":
      case "TEXT":
        try {
          const { filename, originalname } = req.file;
          const destinationFolder = `uploads/${CategoryId}/${TopicId}`;
          const newPath = `${destinationFolder}/${originalname}`;
          const originalPath = `temp/${filename}`;
          await moveFile(destinationFolder, originalPath, newPath);
          contentData = {
            Title,
            Content: newPath,
            UserId: userId,
            CategoryId,
            TopicId,
          };
          // if there are file, delete it from temp folder
          if (req.file) {
            await fs.unlink(originalPath);
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send("Error uploading file");
        }

        break;
      default:
        break;
    }
    const content = await Content.create(contentData);

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Content created",
      content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

deleteContent = (req, res) => {
  try {
    const content = Content.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "Content deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      status: 500,
      message: "Error deleting content",
    });
  }
};

module.exports = {
  getContent,
  getContents,
  createContent,
  deleteContent,
};
