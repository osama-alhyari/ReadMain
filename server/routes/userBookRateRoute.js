import express from "express";
import * as userBookRateController from "../controllers/userBookRateController.js";

const router = express.Router();

router
  .route("/")
  .post(userBookRateController.rateBook)
  .get(userBookRateController.checkIfUserRated);

export { router };
