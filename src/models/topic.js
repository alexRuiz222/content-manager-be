"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.belongsToMany(models.Category, {
        through: models.CategoriesPerTopic, // Your through model (if you have one)
        foreignKey: "TopicId",
        otherKey: "CategoryId",
        as: "categories", // Alias for the associated categories
      });
    }
  }
  Topic.init(
    {
      Name: { type: DataTypes.STRING, unique: true },
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
      modelName: "Topic",
    }
  );
  return Topic;
};
