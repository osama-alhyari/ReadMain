import express from "express";
import * as authorController from "../controllers/authorController.js";
import { validateToken } from "../middleware/tokenValidator.js";

const router = express.Router();

router
  .route("/")
  .post(authorController.addAuthor)
  .patch(authorController.editDetails)
  .get(authorController.getIDFromName);

router.route("/getauthors").get(validateToken, authorController.getAuthors);
router
  .route("/getbookauthor")
  .get(validateToken, authorController.getNameFromID);

export { router };
