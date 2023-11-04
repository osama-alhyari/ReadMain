import { DATABASE, USER, PASSWORD, HOST, DIALECT } from "./config/config.js";
import Sequelize from "sequelize";

const db = {};

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;

export default sequelize;
export { db };
