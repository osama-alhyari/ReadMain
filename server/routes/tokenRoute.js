import express from "express";
import { validateTokenRequest } from "../middleware/tokenValidator.js";

const router = express.Router();

router.route("/").get(validateTokenRequest);

export { router };
