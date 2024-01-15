import express from "express";
import * as bookTagController from "../controllers/bookTagController.js";
import { validateToken } from "../middleware/tokenValidator.js";

const router = express.Router();

router.route("/tags/:bookID").get(bookTagController.showTagsOfBook); // see tags related to one book
router
  .route("/books/:tagID")
  .get(validateToken, bookTagController.showBooksInTags); //see books related to 1 tag
router.route("/addtags/:bookID").post(bookTagController.addTagsToBook);

export { router };
