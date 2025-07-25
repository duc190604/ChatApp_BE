import { messageService } from "~/services/messageService";
const createMessage = async (req, res, next) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};
const revokeMessage = async (req, res, next) => {
  try {
    const message = await messageService.revokeMessage(req.params.id,req.user.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
const deleteMessage = async (req, res, next) => {
  try {
    const message = await messageService.deleteMessage(req.params.id,req.user.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
const updateMessage = async (req, res, next) => {
  try {
    const {content} = req.body;
    const message = await messageService.updateMessage(req.params.id,req.user.id,content);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
const getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages(req.params.id,req.user.id);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};  
export const messageController = {
  createMessage,
  revokeMessage,
  deleteMessage,
  updateMessage,
  getMessages,
};

