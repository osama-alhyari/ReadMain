import { DataTypes } from "sequelize";
import { db } from "../database.js";

const Booktag = db.sequelize.define("booktag", {
  tagID: {
    type: DataTypes.INTEGER,
    field: "tagID",
  },
  bookID: {
    type: DataTypes.INTEGER,
    field: "bookID",
  },
});
export default Booktag;
