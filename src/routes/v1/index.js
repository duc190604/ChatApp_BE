import express from "express";
import ApiError from "~/utils/ApiError";
import userRouter from "./userRoute";
import emailRouter from "./emailRoute";
import uploadRouter from "./uploadRoute";
import requestRouter from "./requestRoute";
const router = express.Router();

router.get("/", (req, res) => {
  throw new ApiError(404, "Not Found");
});
router.use("/user", userRouter);
router.use("/email", emailRouter);
router.use("/upload", uploadRouter);
router.use("/request", requestRouter);

export const APIs_V1 = router;
