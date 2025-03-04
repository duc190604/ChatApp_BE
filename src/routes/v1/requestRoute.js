import express from "express";
import { requestController } from "~/controllers/requestController";
const router = express.Router();

router.post("/", requestController.createRequest);
router.get("/recipient", requestController.getRequestsByRecipient);
router.get("/sender", requestController.getRequestsBySender);
router.put("/:id", requestController.acceptRequest);
router.delete("/:id", requestController.rejectRequest);

export default router;
