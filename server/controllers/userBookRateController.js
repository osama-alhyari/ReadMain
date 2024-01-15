import { catchAsync } from "../utils/catchAsync.js";
import UserBookRate from "../database/models/UserBookRate.js";
import Book from "../database/models/Book.js";

// export const rat5eBook = catchAsync(async (req, res, next) => {
//   const { rate, bookID, userID } = req.body;
//   const book = await Book.findOne({ where: { id: +bookID } });
//   const newRating =
//     (book.numberOfRatings * book.rating + +rate) / (book.numberOfRatings + 1);
//   book.rating = newRating;
//   book.numberOfRatings = book.numberOfRatings + 1;
//   await book.save();
//   const rating = await UserBookRate.create({ userID, bookID, rate });
//   res.status(200).json({ newRating: book.rating });
// });

// export const changeRate = catchAsync(async (req, res, next) => {
//   const { newRate, bookID, userID } = req.body;
//   const oldRate = await UserBookRate.findOne({
//     where: { userID: +userID, bookID: +bookID },
//   });
//   const book = await Book.findOne({ where: { id: +bookID } });
//   book.rating =
//     (book.rating * book.numberOfRatings - oldRate.rate + +newRate) /
//     book.numberOfRatings;
//   await book.save();

//   oldRate.rate = +newRate;
//   await oldRate.save();

//   res.status(200).json({ newRating: book.rating });
// });

export const rateBook = catchAsync(async (req, res, next) => {
  const { rate, bookID, userID } = req.body;
  const oldRate = await UserBookRate.findOne({
    where: { userID: +userID, bookID: +bookID },
  });
  if (oldRate) {
    const book = await Book.findOne({ where: { id: +bookID } });
    if (+rate === 0) {
      res.status(200).json({ newRating: book.rating });
    } else {
      book.rating =
        (book.rating * book.numberOfRatings - oldRate.rate + +rate) /
        book.numberOfRatings;
      await book.save();
      oldRate.rate = +rate;
      await oldRate.save();
      res.status(200).json({ newRating: book.rating });
    }
  } else {
    const book = await Book.findOne({ where: { id: +bookID } });
    const newRating =
      (book.numberOfRatings * book.rating + +rate) / (book.numberOfRatings + 1);
    book.rating = newRating;
    book.numberOfRatings = book.numberOfRatings + 1;
    await book.save();
    await UserBookRate.create({ userID, bookID, rate });
    res.status(200).json({ newRating: book.rating });
  }
});

export const checkIfUserRated = catchAsync(async (req, res, next) => {
  const { userid, bookid } = req.headers;
  const rating = await UserBookRate.findOne({
    where: { userID: +userid, bookID: +bookid },
  });
  if (rating) res.status(200).json({ rated: rating.rate });
  else res.status(200).json({ notRated: "not rated" });
});
