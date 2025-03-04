import mongoose from "mongoose";
const { Schema } = mongoose;
const requestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      required: true,
      default: "pending",
    }, //reject thì xóa luôn
    userBlocked: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
  },

  { timestamps: true }
);
requestSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
requestSchema.set("toJSON", {
  virtuals: true,
});
const Request = mongoose.model("Request", requestSchema);
export default Request;
