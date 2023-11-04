import { DataTypes } from "sequelize";
import { db } from "../database.js";

const User = db.sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: "1",
  },
  token: {
    type: DataTypes.STRING(255),
  },
});
export default User;
