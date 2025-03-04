import mongoose from "mongoose";
const { Schema } = mongoose;
const friendSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userBlocked: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
friendSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
friendSchema.set("toJSON", {
  virtuals: true,
});
const Friend = mongoose.model("Friend", friendSchema);
export default Friend;
