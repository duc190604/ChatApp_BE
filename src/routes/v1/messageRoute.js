import { Router } from "express";
import { messageController } from "~/controllers/messageController";
import { messageValidation } from "~/validations/messageValidation";
const router = Router();

router.post("/", messageValidation.createMessage, messageController.createMessage);
router.put("/:id", messageValidation.updateMessage, messageController.updateMessage);
router.delete("/:id",messageController.deleteMessage);
router.delete("/revoke/:id",messageController.revokeMessage);

export default router;

