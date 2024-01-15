import express from "express";
import * as bookController from "../controllers/bookController.js";
import { validateToken } from "../middleware/tokenValidator.js";

const router = express.Router();

router
  .route("/")
  .post(bookController.addBook)
  .get(validateToken, bookController.getAllBooks);

router.route("/getsuggestions").get(bookController.getSuggestions);

router
  .route("/getauthorbooks")
  .get(validateToken, bookController.getBooksByAuthor);

router
  .route("/:id")
  .get(validateToken, bookController.getBook)
  .patch(bookController.updateBook)
  .delete(validateToken, bookController.softDeleteBook);

router
  .route("/destroy/:id")
  .delete(validateToken, bookController.hardDeleteBook);

export { router };
