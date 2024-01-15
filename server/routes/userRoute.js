import express from "express";
import * as userController from "../controllers/userController.js";
import * as userMiddleware from "../middleware/userMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(userMiddleware.checkIfExistsSignup, userController.signUp);

router
  .route("/login")
  .post(userMiddleware.checkIfExistsLogin, userController.logIn);

router.route("/getuser").get(userController.getUser);

router.route("/getsuggestions").get(userController.suggestUsers);

export { router };
