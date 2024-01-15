import { catchAsync } from "../utils/catchAsync.js";
import Author from "../database/models/Author.js";

export const addAuthor = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const exists = await Author.findOne({ where: { name } });
  if (exists) {
    res.status(200).json({ author: exists });
  } else {
    const author = await Author.create({ name });
    res.status(200).json({ author });
  }
});

export const editDetails = catchAsync(async (req, res, next) => {
  const { id, born, died, influences, description } = req.body;
  const author = await Author.findOne({ where: { id: +id } });
  born ? (author.born = born) : null;
  died ? (author.died = died) : null;
  influences ? (author.influences = influences) : null;
  description ? (author.description = description) : null;
  await author.save();
  res.status(200).json({ author });
});

export const getIDFromName = catchAsync(async (req, res, next) => {
  const { name } = req.headers;
  const author = await Author.findOne({ where: { name } });
  res.status(200).json({ author });
});

export const getAuthors = catchAsync(async (req, res, next) => {
  const authors = await Author.findAll();
  res.status(200).json({ authors });
});

export const getNameFromID = catchAsync(async (req, res, next) => {
  const { authorid } = req.headers;
  console.log(req.headers);
  const author = await Author.findOne({ where: { id: +authorid } });
  res.status(200).json({ author });
});
