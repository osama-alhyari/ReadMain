import express from "express";
import * as booktagController from "../controllers/booktagController.js";

const router = express.Router();

router.param("bookId", async (req, res, next, val) => {
  const book = await Book.findOne({
    where: { id: +val },
  });

  if (!book) {
    return next(new AppError(`no book with id ${val}`, 404));
  }
  next();
});
router.route("/tags/:bookID").get(booktagController.showTagsOfBook); // see tags related to one book
router.route("/books/:tagID").get(booktagController.showBooksInTags); //see books related to 1 tag
router.route("/addtags/:bookID").post(booktagController.addTagsToBook);

export { router };
