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
    type: DataTypes.STRING(255),
  },
  genre: {
    type: DataTypes.STRING(255),
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: "1",
  },
  numberOfPages: {
    type: DataTypes.INTEGER,
  },
});

export default Book;
