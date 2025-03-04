import RefreshToken from "~/models/refreshToken";
import { verifyToken } from "~/utils/auth";
const checkRevoked = async (token) => {
  const decodedToken = await verifyToken(token);
  if(decodedToken.type !== "refresh"){
    return false;
  }
  const revokedToken = await RefreshToken.findOne({ token });
  return revokedToken ? false : true;
};
const addRefreshToken = async (token, userId) => {
  const refreshToken = await RefreshToken.create({ user: userId, token });
  return refreshToken;
};

const deleteRefreshToken = async (token) => {
  const refreshToken = await RefreshToken.deleteOne({ token });
  return refreshToken;
};

const deleteAllRefreshToken = async (userId) => {
  const refreshToken = await RefreshToken.deleteMany({ user: userId });
  return refreshToken;
};
export const refreshTokenService = {
  checkRevoked,
  addRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshToken,
};
