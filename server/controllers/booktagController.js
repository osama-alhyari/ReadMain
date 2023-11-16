import Book from "../database/models/Book.js";
import Booktag from "../database/models/Booktag.js";
import Tag from "../database/models/Tag.js";
import { catchAsync } from "../utils/catchAsync.js";

export const showTagsOfBook = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  const tagsInBook = [];
  const tagPairs = await Booktag.findAll({
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
  const booksInTag = [];
  const tagPairs = await Booktag.findAll({
    where: {
      tagID,
    },
  });
  let book;
  for (let bookID in tagPairs) {
    book = await Book.findOne({
      where: { id: tagPairs[bookID].dataValues.bookID },
    });
    booksInTag.push(book);
  }
  res.status(201).json({ bookList: booksInTag });
});

export const addTagsToBook = async (req, res, next) => {
  // check id middleware
  //in front-end show tag list to user to check box from
  // every check adds the tagID to the list
  const { bookID } = req.params;
  const { tagID } = req.body;
  await Booktag.create({
    bookID: +bookID,
    tagID: +tagID,
  });

  res.status(200).json({ message: "tags added" });
};
