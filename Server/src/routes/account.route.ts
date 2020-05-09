import express from "express";
import * as userController from "../controllers/user";
import * as passportConfig from "../config/passport";

const router = express.Router();
router.route("/").get(function (req: any, res: any, next: any) {
    res.status(200).send({ message: "Welcome to user account" });
});
router.post("/profile", passportConfig.isAuthenticated, userController.updateProfile);
router.post("/password", passportConfig.isAuthenticated, userController.updatePassword);
router.post("/delete", passportConfig.isAuthenticated, userController.deleteAccount);
router.get("/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

export default router;
