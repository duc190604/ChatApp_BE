import { hashPassword, comparePassword } from "~/utils/auth";
import refreshTokenService from "~/services/refreshTokenService";
import User from "~/models/user";
import ApiError from "~/utils/ApiError";
const register = async (data) => {
  const password = await hashPassword(data.password);
  const isExist = await User.findOne({ email: data.email });
  if (isExist) {
    throw new ApiError(400, "Email already exists");
  }
  const user = await User.create({ ...data, password });
  delete user.password;
  return user;
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid password");
  }
  return user;
};
const changePassword = async (userId, oldPassword, newPassword, isLogoutAll=false) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid old password");
  }
  user.password = await hashPassword(newPassword);
  await user.save();
  delete user.password;
  if (isLogoutAll) {
    await refreshTokenService.deleteAllRefreshToken(userId);
  }
  return user;
};
const resetPassword = async (email, newPassword, isLogoutAll=false) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.password = await hashPassword(newPassword);
  await user.save();
  delete user.password;
  if (isLogoutAll) {
    await refreshTokenService.deleteAllRefreshToken(user._id);
  }
  return user;
};
const findUserByUsername = async (username) => {
  const user = await User.findOne({ username: { $regex: new RegExp(`^${username}`, "i") } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};
const blockUser = async (userId, blockedUserId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.userBlocked.push(blockedUserId);
  await user.save();
  return user;
};
const unblockUser = async (userId, blockedUserId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.userBlocked = user.userBlocked.filter(id => id.toString() !== blockedUserId.toString());
  await user.save();
  return user;
};
export const userService = {
  register,
  login,
  changePassword,
  resetPassword,
  findUserByUsername,
  blockUser,
  unblockUser,
};
