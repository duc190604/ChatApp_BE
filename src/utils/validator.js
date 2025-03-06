import validator from "validator";

export const isEmail = (email) => {
  return validator.isEmail(email);
};

export const isPhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber);
};

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
export const OBJECT_ID_RULE_MESSAGE =
  "Your string fails to match the Object Id pattern!";
export const objectIdRule = Joi.string().custom((value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error("objectId.invalid");
  }
  return new ObjectId(value);
}, "ObjectId Validation").messages({
  "objectId.invalid": "Your string fails to match the Object Id pattern!",
});