import Message from "~/models/message";
import ApiError from "~/utils/ApiError";
const createMessage = async (message) => {
  const newMessage = await Message.create(message);
  const populatedMessage = await newMessage.populate({
    path: "sender",
    select: "username avatar _id"
  });
  return populatedMessage;
};

const getMessages = async (chatId, userId) => {
  const messages = await Message.find({ chat: chatId }).populate({
    path: "sender",
    select: "username avatar _id",
  });
  console.log("userId",userId);
  const filteredMessages = messages.filter(message => !message.userDeleted.includes(userId));
  return filteredMessages;
};

const revokeMessage = async (messageId, userId) => {
  const message = await Message.findById(messageId);
  if(!message){
    throw new ApiError(404, "Message not found");
  }
  if(message.sender.toString() !== userId){
    throw new ApiError(403, "You are not allowed to revoke this message");
  }
  message.isRevoked = true;
  await message.save();
  return message;
};
const deleteMessage = async (messageId,userId) => {
  const message = await Message.findById(messageId);
  message.userDeleted.push(userId);
  await message.save();
  return message;
};
const updateMessage = async (messageId,userId,content) => {
  const message = await Message.findById(messageId).populate({
    path: "sender",
    select: "username avatar _id",
  });;
  if(!message){
    throw new ApiError(404, "Message not found");
  }
  if(message.sender._id.toString() !== userId){
    throw new ApiError(403, "You are not allowed to update this message");
  }
  message.content = content;
  message.isUpdated = true;
  await message.save();
  return message;
};
const deleteMessageFromChat = async (chatId,userId) => {
  const messages = await Message.find({ chat: chatId });
  messages.forEach(async (message) => {
    if(!message.userDeleted.includes(userId)){
      message.userDeleted.push(userId);
    }
    await message.save();
  });
  return {
    message: "Messages deleted",
  }
};
export const messageService = {
  createMessage,
  getMessages,
  revokeMessage,
  deleteMessage,
  updateMessage,
  deleteMessageFromChat,
};
