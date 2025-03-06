import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "audio", "video"], required: true },
  status: { type: String, enum: ["sent", "delivered", "seen"], required: true, default: "sent" },
  userDeleted: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
  isRevoked: { type: Boolean, default: false },
  isUpdated: { type: Boolean, default: false },
}, { timestamps: true });
messageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
// messageSchema.virtual("isUpdated").get(function () {
//   return this.createdAt !== this.updatedAt;
// });
messageSchema.set("toJSON", {
  virtuals: true,
});
const Message = mongoose.model("Message", messageSchema);
export default Message;

