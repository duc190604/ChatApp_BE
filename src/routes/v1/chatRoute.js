import { Router } from "express";
import { chatController } from "../../controllers/chatController";
import { chatValidation } from "../../validations/chatValidation";
const router = Router();

router.post(
  "/create-private-chat",
  chatValidation.createPrivateChat,
  chatController.createPrivateChat
);
router.post(
  "/create-group-chat",
  chatValidation.createGroupChat,
  chatController.createGroupChat
);
router.post(
  "/add-member",
  chatValidation.modifyMemberGroupChat,
  chatController.addMemberToGroupChat
);
router.post(
  "/remove-member",
  chatValidation.modifyMemberGroupChat,
  chatController.removeMemberFromGroupChat
);
router.post("/set-admin-mode", chatController.setAdminMode);
router.post(
  "/pin-message",
  chatValidation.modifyPinMessage,
  chatController.pinMessage
);
router.post(
  "/unpin-message",
  chatValidation.modifyPinMessage,
  chatController.unpinMessage
);
router.post(
  "/add-admin",
  chatValidation.modifyAdminGroupChat,
  chatController.addAdminToGroupChat
);
router.post(
  "/remove-admin",
  chatValidation.modifyAdminGroupChat,
  chatController.removeAdminFromGroupChat
);
router.get("/", chatController.getChatByUserId);
router.get("/:chatId", chatController.getChatById);
export default router;
