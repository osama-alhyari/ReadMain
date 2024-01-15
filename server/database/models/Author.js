import { DataTypes } from "sequelize";
import { db } from "../database.js";

const Author = db.sequelize.define("author", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  born: {
    type: DataTypes.STRING(255),
  },
  died: {
    type: DataTypes.STRING(255),
  },
  influences: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.TEXT("long"),
  },
});

export default Author;
