import { DataTypes } from "sequelize";
import { db } from "../database.js";

const UserBookRate = db.sequelize.define("userbookrate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER,
  },
  bookID: {
    type: DataTypes.INTEGER,
  },
  rate: {
    type: DataTypes.INTEGER,
  },
});
export default UserBookRate;
