import { Request } from "~/models/request";
import ApiError from "~/utils/ApiError";
import { User } from "~/models/user";
const createRequest = async (sender, recipient) => {
  const existingRequest = await Request.findOne({ sender, recipient });
  if (existingRequest) {
    throw new ApiError(400, "Request already exists");
  }
  const existingRecipientRequest = await Request.findOne({
    sender: recipient,
    recipient: sender,
  });
  if (existingRecipientRequest) {
    // await friendService.createFriend(sender, recipient);
    const request = await Request.findOne({ sender, recipient });
    request.status = "accepted";
    await request.save();
    return {
      message: "Request accepted",
      request,
    };
  }
  const request = await Request.create({ sender, recipient });
  return request;
};
const acceptRequest = async (id, recipient) => {
  const request = await Request.findOne({ _id: id });
  if (!request) {
    throw new ApiError(404, "Request not found");
  }
  if (request.recipient.toString() !== recipient.toString()) {
    throw new ApiError(403, "You are not authorized to accept this request");
  }
  request.status = "accepted";
  await request.save();
  return request;
};
const rejectRequest = async (id, recipient) => {
  const request = await Request.findOne({ _id: id });
  if (!request) {
    throw new ApiError(404, "Request not found");
  }
  if (request.recipient.toString() !== recipient.toString()) {
    throw new ApiError(403, "You are not authorized to reject this request");
  }
  await Request.findByIdAndDelete(id);
  return {
    message: "Request rejected",
  };
};
const getRequestsByRecipient = async (recipient) => {
  const requests = await Request.find({ recipient });
  return requests;
};
const getRequestsBySender = async (sender) => {
  const requests = await Request.find({ sender });
  return requests;
};
const getFriend=async(userId)=>{
  const user=await User.findById(userId);
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const friends=await Request.find({$or:[{sender:userId},{recipient:userId}],status:"accepted"});
  return friends;
}
const deleteFriend=async(userId,friendId)=>{
  const user=await User.findById(userId);
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const friend=await Request.findOne({$or:[{sender:userId,recipient:friendId},{sender:friendId,recipient:userId}]});
  if(!friend){
    throw new ApiError(404,"Friend not found");
  }
  await Request.findByIdAndDelete(friend._id);
  return {
    message:"Friend deleted"
  };
}
export const requestService = {
  createRequest,
  acceptRequest,
  rejectRequest,
  getRequestsByRecipient,
  getRequestsBySender,
  getFriend,
  deleteFriend,
};
