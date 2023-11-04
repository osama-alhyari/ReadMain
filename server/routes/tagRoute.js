import express from "express";
import * as tagController from "../controllers/tagController.js";

const router = express.Router();

router.route("/").post(tagController.addTag)

export { router };