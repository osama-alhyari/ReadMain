import Book from "../database/models/Book.js";
import BookTag from "../database/models/BookTag.js";
import { catchAsync } from "../utils/catchAsync.js";
import UserBookRate from "../database/models/UserBookRate.js";
import Tag from "../database/models/Tag.js";

export const addBook = catchAsync(async (req, res, next) => {
  const { name, language, numberOfPages, authorID } = req.body;
  const newBook = await Book.create({
    name,
    language,
    numberOfPages,
    authorID: +authorID,
  });
  // const bookID = newBook.id;
  // if (tagsString) {
  //   const tagsArray = tagsString.split(",");
  //   for (let i in tagsArray) {
  //     let tag = await Tag.findOne({ where: { name: tagsArray[i] } });
  //     if (!tag) {
  //       tag = await Tag.create({
  //         name: tagsArray[i],
  //       });
  //     }
  //     let tagID = tag.id;
  //     await BookTag.create({
  //       bookID: +bookID,
  //       tagID: +tagID,
  //     });
  //   }
  // }
  res.status(201).json({ book: newBook });
});

export const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll({ where: { isAvailable: 1 } });
  res.status(200).json({ results: books.length, books });
});

export const updateBook = catchAsync(async (req, res, next) => {
  //On front-end button submit, the values should all be updated

  const { id } = req.params;
  const { name, language, numberOfPages, description } = req.body;
  const toBeUpdated = await Book.findOne({ where: { id: +id } });
  toBeUpdated.name = name;
  toBeUpdated.language = language;
  toBeUpdated.numberOfPages = +numberOfPages;
  toBeUpdated.description = description;
  await toBeUpdated.save();

  res.status(201).json({ message: `book with id: ${id} is updated ` });
});

export const getBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findOne({
    where: { id: +id },
  });

  res.status(200).json({ book });
});

export const hardDeleteBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await BookTag.destroy({
    where: {
      bookID: +id,
    },
  });
  await UserBookRate.destroy({
    where: {
      bookID: +id,
    },
  });
  await Book.destroy({
    where: {
      id: +id,
    },
  });

  res.status(200).json({ message: `book with id: ${id} is destroyed ` });
});

export const softDeleteBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Book.update(
    {
      isAvailable: 0,
    },
    { where: { id: +id } }
  );

  res.status(201).json({ message: `book with id: ${id} is deleted ` });
});

export const getSuggestions = catchAsync(async (req, res, next) => {
  const { text } = req.headers;
  if (text === "") {
    res.status(200).json({ books: [] });
  }
  const getBooks = await Book.findAll();
  const books = [];
  for (let i in getBooks) {
    books.push({ name: getBooks[i].name, id: getBooks[i].id });
  }
  res.status(200).json({
    books: books.filter((book) => {
      return book.name.startsWith(text);
    }),
  });
});

export const getBooksByAuthor = catchAsync(async (req, res, next) => {
  const { authorid } = req.headers;
  const books = await Book.findAll({ where: { authorID: +authorid } });
  res.status(200).json({ books });
});
