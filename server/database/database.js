import Sequelize from "sequelize";
import 'dotenv/config'

const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
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
