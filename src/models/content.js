"use strict";
const { Model } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *    Content:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the content.
 *           example: 1
 *         Title:
 *           type: string
 *           description: Title of the content.
 *           example: "Example title"
 *         Url:
 *           type: string
 *           description: URL of the content.
 *           example: "https://example.com"
 *         CategoryId:
 *           type: integer
 *           description: ID of the category to which the content belongs.
 *           example: 1
 *         TopicId:
 *           type: integer
 *           description: ID of the topic to which the content belongs.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date and time of the content.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date and time of the content.
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Deletion date and time of the content (if applicable).
 */
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        allowNull: false,
      });
      Content.belongsTo(models.Topic, {
        foreignKey: "TopicId",
        allowNull: false,
      });
      Content.belongsTo(models.User, {
        foreignKey: "UserId",
        allowNull: false,
      });
    }
  }
  Content.init(
    {
      Title: DataTypes.STRING,
      Content: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Content",
    }
  );
  return Content;
};
