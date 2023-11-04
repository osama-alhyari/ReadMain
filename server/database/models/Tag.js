import { DataTypes } from "sequelize";
import { db } from "../database.js";

const Tag = db.sequelize.define("tag", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.STRING(255),
    defaultValue: "description unavailable",
  },
});
export default Tag;
