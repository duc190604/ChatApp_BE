import Joi from "joi";
const login = async (req, res, next) => {
  const correctCondition = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  const correctCondition = {
    email: Joi.string().email().required().trim().strict(),
    password: Joi.string().min(8).required().trim().strict(),
    username: Joi.string().min(3).required().trim().strict(),
    avatar: Joi.string().optional().trim().strict(),
    status: Joi.string().optional().trim().strict(),
    description: Joi.string().optional().trim().strict(),
  };
  try{
    await Joi.object(correctCondition).validateAsync(req.body,{abortEarly:false});
    next();
  } catch (error) {
    next(error);
  }
};
export const userValidation = {
  login,
  register,
};

