import { Router } from "express";
import { emailController } from "~/controllers/emailController";

const router = Router();

router.post("/send-verify-email", emailController.sendVerifyEmail);
router.post("/verify-email", emailController.verifyEmail);

export default router;
