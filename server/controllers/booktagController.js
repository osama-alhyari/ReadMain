import Book from "../database/models/Book.js";
import BookTag from "../database/models/BookTag.js";
import Tag from "../database/models/Tag.js";
import { catchAsync } from "../utils/catchAsync.js";

export const showTagsOfBook = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  const tagsInBook = [];
  const tagPairs = await BookTag.findAll({
    where: {
      bookID: +bookID,
    },
  });
  let tag;
  for (const tagID in tagPairs) {
    tag = await Tag.findOne({
      where: { id: tagPairs[tagID].dataValues.tagID },
    });
    tagsInBook.push(tag);
  }
  res.status(201).json({ tagList: tagsInBook });
});

export const showBooksInTags = catchAsync(async (req, res, next) => {
  const { tagID } = req.params;
  console.log(req.params);
  const booksInTag = [];
  const tagPairs = await BookTag.findAll({
    where: {
      tagID: +tagID,
    },
  });
  let book;
  for (let bookID in tagPairs) {
    book = await Book.findOne({
      where: { id: +tagPairs[bookID].dataValues.bookID },
    });
    booksInTag.push(book);
  }
  res.status(201).json({ bookList: booksInTag });
});

export const addTagsToBook = catchAsync(async (req, res, next) => {
  // check id middleware
  //in front-end show tag list to user to check box from
  // every check adds the tagID to the list
  const { bookid } = req.headers;
  const { tagid } = req.headers;
  await BookTag.create({
    bookID: +bookid,
    tagID: +tagid,
  });

  res.status(200).json({ message: "tags added" });
});
