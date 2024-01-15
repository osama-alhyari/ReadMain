import { DataTypes } from "sequelize";
import { db } from "../database.js";

const Book = db.sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  language: {
    type: DataTypes.STRING(45),
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: "0",
  },
  numberOfPages: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT("long"),
  },
  rating: {
    type: DataTypes.FLOAT,
  },
  numberOfRatings: {
    type: DataTypes.INTEGER,
  },
  authorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING(45),
  },
});

export default Book;
