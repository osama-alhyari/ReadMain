import { DataTypes } from "sequelize";
import { db } from "../database.js";

const BookTag = db.sequelize.define("booktag", {
  tagID: {
    type: DataTypes.INTEGER,
    field: "tagID",
  },
  bookID: {
    type: DataTypes.INTEGER,
    field: "bookID",
  },
});
export default BookTag;
