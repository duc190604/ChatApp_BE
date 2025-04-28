import { userService } from "~/services/userService";
import { generateToken } from "~/utils/auth";
import { refreshTokenService } from "~/services/refreshTokenService";
import User from "~/models/user";
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    const accessToken = await generateToken(user.id, "1h", "access");
    const refreshToken = await generateToken(user.id, "7d", "refresh");
    await refreshTokenService.addRefreshToken(refreshToken, user.id);
    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const userToken = req.user
    if(userToken.type !== "email" || userToken.id !== req.body.email){
      return res.status(422).json({ message: "Invalid token for email verification" });
    }
    const user = await userService.register(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await refreshTokenService.deleteRefreshToken(refreshToken);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, isLogoutAll } = req.body;
    const userToken = req.user
    if(userToken.type !== "email" || userToken.id !== email){
      return res.status(400).json({ message: "Invalid token for email verification" });
    }
    await userService.resetPassword(email, newPassword, isLogoutAll);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
const findUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await userService.findUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const refreshToken =async (req,res, next)=>{
  try {
    const userToken = req.user
    const accessToken = await generateToken(userToken.id, "1h", "access");
    res.status(200).json({accessToken})
  }
  catch (error)
  {
    next(err)
  }
}
export const userController = {
  login,
  register,
  logout,
  changePassword,
  resetPassword,
  findUserByUsername,
  refreshToken
};
