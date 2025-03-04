import validator from "validator";

export const isEmail = (email) => {
  return validator.isEmail(email);
};

export const isPhoneNumber = (phoneNumber) => {
  return validator.isMobilePhone(phoneNumber);
};
