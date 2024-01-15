import express from "express";
import * as tagController from "../controllers/tagController.js";
import { validateToken } from "../middleware/tokenValidator.js";

const router = express.Router();

router
  .route("/")
  .post(validateToken, tagController.addTag)
  .get(validateToken, tagController.getTags);

export { router };
