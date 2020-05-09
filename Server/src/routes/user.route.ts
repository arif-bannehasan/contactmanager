import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.route("/").get(userController.getUser);

router.route("/login").post(userController.postLogin);
router.route("/logout").post(userController.logout);
router.route("/forgot").post(userController.forgotPassword);
router.route("/reset/:token").post(userController.resetPassword);
router.route("/signup").post(userController.signUp);

export default router;