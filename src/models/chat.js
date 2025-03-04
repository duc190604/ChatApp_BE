import mongoose from "mongoose";
const { Schema } = mongoose;
const chatSchema = new Schema({
  members: { type: Array, ref: "User" },
  isGroup: { type: Boolean, default: false },
  userMuted: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
  focusMessages: { type: [{ type: Schema.Types.ObjectId, ref: "Message" }], required: false },
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: false },
  admin: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
  membersBlocked: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
}, { timestamps: true });
chatSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
chatSchema.set("toJSON", {
  virtuals: true,
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;

