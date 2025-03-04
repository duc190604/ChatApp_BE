import mongoose from "mongoose";
const { Schema } = mongoose;
const refreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
});
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
