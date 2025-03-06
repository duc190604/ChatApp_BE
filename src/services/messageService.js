import Message from "~/models/message";

const createMessage = async (message) => {
  const newMessage = await Message.create(message);
  return newMessage;
};

const getMessages = async (chatId) => {
  const messages = await Message.find({ chat: chatId });
  return messages;
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
const updateMessage = async (messageId,userId,content,type) => {
  const message = await Message.findById(messageId);
  if(!message){
    throw new ApiError(404, "Message not found");
  }
  if(message.sender.toString() !== userId){
    throw new ApiError(403, "You are not allowed to update this message");
  }
  message.content = content;
  message.type = type;
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
