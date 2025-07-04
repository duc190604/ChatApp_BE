import Chat from "~/models/chat";
import User from "~/models/user";
import { DEFAULT_AVATAR } from "~/utils/constants";
import ApiError from "~/utils/ApiError";
const createPrivateChat = async (sender, recipient) => {
  const chat = await Chat.create({
    members: [sender, recipient],
    creator: sender,
  });
  return chat;
};
const createGroupChat = async (members, name, avatar, creator) => {
  const chat = await Chat.create({
    members,
    name,
    avatar,
    isGroup: true,
    creator,
    admin: [creator],
  });
  return chat;
};
const addMemberToGroupChat = async (chatId, member,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  if(chat.members.includes(member)){
    throw new ApiError(400, "Member already in the group");
  }
  if(chat.isAdminMode){
    if(!chat.admin.includes(userId)){
      throw new ApiError(403, "You are not allowed to add member to this group");
    }
  }
  chat.members.push(member);
  await chat.save();
  return chat;
};
const removeMemberFromGroupChat = async (chatId, member,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  if(chat.isAdminMode && chat.creator.toString() !== userId){
    if(!chat.admin.includes(userId)){
      throw new ApiError(403, "You are not allowed to remove member from this group");
    }
  }
  chat.members = chat.members.filter(m => m.toString() !== member.toString());
  chat.admin = chat.admin.filter(a => a.toString() !== member.toString());
  await chat.save();
  return chat;
};
const setAdminMode = async (chatId, isAdminMode,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  if(chat.creator.toString() !== userId){
    throw new ApiError(403, "You are not allowed to set admin mode for this group");
  }
  chat.isAdminMode = isAdminMode;
  await chat.save();
  return chat;
};
const pinMessage = async (chatId, messageId,userId) => {
  const chat = await Chat.findById(chatId);
  const message = await Message.findById(messageId);
  if(!chat || !message){
    throw new ApiError(404, "Chat or message not found");
  }
  if(!chat.members.includes(userId)){
    throw new ApiError(403, "You are not allowed to pin message in this chat");
  }
  if (chat.isAdminMode && !chat.admin.includes(userId)) {
    throw new ApiError(403,"You are not allowed to pin message in this group");
  }
  if(chat.pinnedMessages.includes(messageId)){
    throw new ApiError(400, "Message already pinned");
  }
  chat.pinnedMessages.push(messageId);
  await chat.save();
  return chat;
};
const unpinMessage = async (chatId, messageId,userId) => {
  const chat = await Chat.findById(chatId);
  const message = await Message.findById(messageId);
  if(!chat || !message){
    throw new ApiError(404, "Chat or message not found");
  }
  if(!chat.members.includes(userId)){
    throw new ApiError(403, "You are not allowed to unpin message in this chat");
  }
  if(chat.isAdminMode && !chat.admin.includes(userId)){
    throw new ApiError(403, "You are not allowed to unpin message in this group");
  }
  chat.pinnedMessages = chat.pinnedMessages.filter(m => m.toString() !== messageId.toString());
  await chat.save();
  return chat;
};
const addAdminToGroupChat = async (chatId, admin,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  if(chat.creator.toString() !== userId){
    throw new ApiError(403, "You are not allowed to add admin to this group");
  }
  if(chat.admin.includes(admin)){
    throw new ApiError(400, "Admin already in the group");
  }
  chat.admin.push(admin);
  await chat.save();
  return chat;
};
const removeAdminFromGroupChat = async (chatId, admin,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  if(chat.creator.toString() !== userId){
    throw new ApiError(403, "You are not allowed to remove admin from this group");
  }
  chat.admin = chat.admin.filter(a => a.toString() !== admin.toString());
  await chat.save();
  return chat;
};
const getChatByUserId = async (userId) => {
  const chats = await Chat.find({ members: { $in: [userId] } }).populate("lastMessage");
  if(!chats){
    throw new ApiError(404, "No chats found");
  }
  const updatedChats = await Promise.all(chats.map(async (chat) => {
    if(!chat.isGroup){
      const user = await User.findById(chat.members.find(m => m.toString() !== userId.toString()));
      return {
        ...chat.toObject(),
        name: user.username,
        avatar: user.avatar || DEFAULT_AVATAR,
      }
    }
    return chat;
  }));
  console.log(updatedChats);
  return updatedChats;
};
const getChatById = async (chatId,userId) => {
  const chat = await Chat.findById(chatId);
  if(!chat){
    throw new ApiError(404, "Chat not found");
  }
  const user = await User.findById(chat.members.find(m => m.toString() !== userId.toString()));
  if(!user){
    throw new ApiError(404, "User not found"  );
  }
  const updatedChat = {
    ...chat.toObject(),
    name: user.username,
    avatar: user.avatar || DEFAULT_AVATAR,
  }
  return updatedChat;
};

export const chatService = {
  createPrivateChat,
  createGroupChat,
  addMemberToGroupChat,
  removeMemberFromGroupChat,
  setAdminMode,
  pinMessage,
  unpinMessage,
  addAdminToGroupChat,
  removeAdminFromGroupChat,
  getChatByUserId,
  getChatById,
};
