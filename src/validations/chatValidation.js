import Joi from "joi";
import { objectIdRule } from "~/utils/validator";
const createPrivateChat = async (req, res, next) => {
  const correctCondition = {
   recipient: objectIdRule().required()
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const createGroupChat = async (req, res, next) => {
  const correctCondition = {
    members: Joi.array().items(objectIdRule().required()).min(3).required(),
    name: Joi.string().required(),
    avatar: Joi.string().optional(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const modifyMemberGroupChat = async (req, res, next) => {
  const correctCondition = {
    chatId: objectIdRule().required(),
    memberId: objectIdRule().required(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const modifyPinMessage = async (req, res, next) => {
  const correctCondition = {
    chatId: objectIdRule().required(),
    messageId: objectIdRule().required(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const modifyAdminGroupChat = async (req, res, next) => {
  const correctCondition = {
    chatId: objectIdRule().required(),
    adminId: objectIdRule().required(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const setAdminMode = async (req, res, next) => {
  const correctCondition = {
    chatId: objectIdRule().required(),
    isAdminMode: Joi.boolean().required(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
export const chatValidation = {
  createPrivateChat,
  createGroupChat,
  modifyMemberGroupChat,
  modifyPinMessage,
  modifyAdminGroupChat
};



