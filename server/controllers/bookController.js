import Book from "../database/models/Book.js";
import Booktag from "../database/models/Booktag.js";
import { catchAsync } from "../utils/catchAsync.js";
import Tag from "../database/models/Tag.js";
import User from "../database/models/User.js";

export const addBook = catchAsync(async (req, res, next) => {
  const { name, genre, language, numberOfPages, tagsString } = req.body;
  const newBook = await Book.create({
    name,
    genre,
    language,
    numberOfPages,
  });
  const bookID = newBook.id;
  if (tagsString) {
    const tagsArray = tagsString.split(",");
    for (let i in tagsArray) {
      let tag = await Tag.findOne({ where: { name: tagsArray[i] } });
      if (!tag) {
        tag = await Tag.create({
          name: tagsArray[i],
        });
      }
      let tagID = tag.id;
      await Booktag.create({
        bookID: +bookID,
        tagID: +tagID,
      });
    }
  }
  console.log(newBook);
  res.status(201).json({ book: newBook });
});

export const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll();
  res.status(200).json({ results: books.length, books });
});

export const updateBook = catchAsync(async (req, res, next) => {
  //On front-end button submit, the values should all be updated
  
  const { id } = req.params;
  console.log(req.params);
  const toBeUpdated = await Book.findOne ({where :{ id : +id}})
  toBeUpdated.name = req.body.bookObject.name
  toBeUpdated.genre = req.body.bookObject.genre
  toBeUpdated.language = req.body.bookObject.language
  toBeUpdated.numberOfPages = req.body.bookObject.numberOfPages
  await toBeUpdated.save ()

  // await Book.update(
  //   {
  //     name: req.body.newName,
  //     genre: req.body.newGenre,
  //     language: req.body.newLanguage,
  //     numberOfPages: req.body.newNumberOfPages,
  //   },
  //   { where: { id: +id } }
  // );
  console.log("i am here");
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
  await Booktag.destroy({
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
