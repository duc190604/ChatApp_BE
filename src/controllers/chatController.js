import { chatService } from "../services/chatService";
import { DEFAULT_GROUP_AVATAR } from "../utils/constants";
const createPrivateChat = async (req, res,next) => {
  try {
    const sender = req.user.id;
    const { recipient } = req.body;
    const chat = await chatService.createPrivateChat(sender, recipient);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};
const createGroupChat = async (req, res,next) => {
  try {
    const { members, name, avatar } = req.body;
    const creator = req.user.id;
    if(members.length <3 ){
      throw new ApiError(400, "Group must have at least 3 members");
    }
    if(!avatar){
      avatar = DEFAULT_GROUP_AVATAR;
    }
    const chat = await chatService.createGroupChat(members, name, avatar, creator);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};
const addMemberToGroupChat = async (req, res,next) => {
  try {
    const { chatId, member } = req.body;
    const userId = req.user.id;
    const chat = await chatService.addMemberToGroupChat(chatId, member,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
const removeMemberFromGroupChat = async (req, res,next) => {
  try {
    const { chatId, member } = req.body;
    const userId = req.user.id;
    const chat = await chatService.removeMemberFromGroupChat(chatId, member,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
const setAdminMode = async (req, res,next) => {
  try {
    const { chatId, isAdminMode } = req.body;
    const userId = req.user.id;
    const chat = await chatService.setAdminMode(chatId, isAdminMode,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};  
const pinMessage = async (req, res,next) => {
  try {
    const { chatId, messageId } = req.body;
    const userId = req.user.id;
    const chat = await chatService.pinMessage(chatId, messageId,userId);  
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
const unpinMessage = async (req, res,next) => {
  try {
    const { chatId, messageId } = req.body;
    const userId = req.user.id;
    const chat = await chatService.unpinMessage(chatId, messageId,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
const addAdminToGroupChat = async (req, res,next) => {
  try {
    const { chatId, admin } = req.body;
    const userId = req.user.id;
    const chat = await chatService.addAdminToGroupChat(chatId, admin,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
const removeAdminFromGroupChat = async (req, res,next) => {
  try {
    const { chatId, admin } = req.body;
    const userId = req.user.id;
    const chat = await chatService.removeAdminFromGroupChat(chatId, admin,userId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
export const chatController = {
  createPrivateChat,
  createGroupChat,
  addMemberToGroupChat,
  removeMemberFromGroupChat,
  setAdminMode,
  pinMessage,
  unpinMessage,
  addAdminToGroupChat,
  removeAdminFromGroupChat,
};








