import { DataTypes } from "sequelize";
import { db } from "../database.js";

const Transaction = db.sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    field: "userID",
  },
  bookID: {
    type: DataTypes.INTEGER,
    field: "bookID",
  },
  type: {
    type: DataTypes.STRING(255),
  },
});
export default Transaction;
