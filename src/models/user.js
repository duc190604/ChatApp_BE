import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
  status: { type: String, required: false },
  description: { type: String, required: false, default: "" },
  lastSeen: { type: Date, required: false },
  chatLocked: {
    type: [
      {
        chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
        locked: { type: Number, require: true },
      },
    ],
    required: false,
  },
  userBlocked: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);
export default User;

