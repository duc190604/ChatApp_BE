import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "../utils/validator";
const createMessage = async (req, res, next) => {
  const correctCondition = {
    content: Joi.string().required(),
    chatId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    senderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    type: Joi.string().required().valid("text", "image", "audio", "video"),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const updateMessage = async (req, res, next) => {
  const correctCondition = {
    content: Joi.string().required(),
    type: Joi.string().required().valid("text", "image", "audio", "video"),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
export const messageValidation = {
  createMessage,
  updateMessage,
};
