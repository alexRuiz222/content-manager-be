"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsToMany(models.Topic, {
        through: "CategoriesPerTopic",
        foreignKey: "CategoryId",
        as: "topics",
      });
    }
  }
  Category.init(
    {
      Name: {
        type: DataTypes.STRING,
        unique: true,
      },
      Type: {
        type: DataTypes.ENUM("URL_VIDEO", "IMAGE", "TEXT"),
        allowNull: false,
      },

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
      modelName: "Category",
    }
  );

  return Category;
};
