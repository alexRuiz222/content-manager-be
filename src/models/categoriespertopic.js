"use strict";
const { Model } = require("sequelize");

const Category = require("./category");
const Topic = require("./topic");

module.exports = (sequelize, DataTypes) => {
  class CategoriesPerTopic extends Model {
    static async associate(models) {
      CategoriesPerTopic.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        onDelete: "RESTRICT",
      });
      CategoriesPerTopic.belongsTo(models.Topic, {
        foreignKey: "TopicId",
        onDelete: "RESTRICT",
      });
    }
  }
  CategoriesPerTopic.init(
    {
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
      modelName: "CategoriesPerTopic",
    }
  );
  return CategoriesPerTopic;
};
