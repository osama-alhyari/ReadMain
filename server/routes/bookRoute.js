import express from "express";
import * as bookController from "../controllers/bookController.js";
import Book from "../database/models/Book.js";
import { AppError } from "../utils/appError.js";
import { validateToken } from "../middleware/tokenValidator.js";

const router = express.Router();

router
  .route("/")
  .post(bookController.addBook)
  .get(validateToken, bookController.getAllBooks);

// router.param("id", async (req, res, next, val) => {
//   const book = await Book.findOne({
//     where: { id: +val },
//   });

//   if (!book) {
//     return next(new AppError(`no book with id ${val}`, 404));
//   }
//   next();
// });

router
  .route("/:id")
  .get(validateToken, bookController.getBook)
  .patch(bookController.updateBook)
  .delete(validateToken, bookController.softDeleteBook);

router
  .route("/destroy/:id")
  .delete(validateToken, bookController.hardDeleteBook);

export { router };
