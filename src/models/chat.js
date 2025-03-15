import mongoose from "mongoose";
const { Schema } = mongoose;
const chatSchema = new Schema({
  members: {  type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  isGroup: { type: Boolean, default: false },
  userMuted: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
  pinnedMessages: { type: [{ type: Schema.Types.ObjectId, ref: "Message" }], required: false },
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
  name: { type: String, required: false },
  avatar: { type: String, required: false },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  admin: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },
  membersBlocked: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], required: false },//for private chat
  isAdminMode: { type: Boolean, default: false, required: false },

}, { timestamps: true });
chatSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
chatSchema.set("toJSON", {
  virtuals: true,
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;

