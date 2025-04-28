import express from "express";
import { userController } from "~/controllers/userController";
import { userValidation } from "~/validations/userValidation";
const router = express.Router();

router.post("/login", userValidation.login, userController.login);
router.post("/register", userValidation.register, userController.register);
router.post("/logout", userController.logout);
router.post("/change-password", userController.changePassword);
router.post("/reset-password", userController.resetPassword);
router.get("/find-by-username/:username", userController.findUserByUsername);
router.get("/refresh-token",userController.refreshToken)

export default router;
