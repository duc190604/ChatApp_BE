import { refreshTokenService } from "~/services/refreshTokenService";
// const addRefreshToken = async (token, userId) => {
//   const refreshToken = await refreshTokenService.addRefreshToken(token, userId);
// };
// const checkRevoked = async (token) => {
//   const revokedToken = await refreshTokenService.checkRevoked(token);
//   return revokedToken;
// };

// const deleteRefreshToken = async (token) => {
//   const refreshToken = await refreshTokenService.deleteRefreshToken(token);
//   return refreshToken;
// };

const deleteAllRefreshToken = async (req, res) => {
  try {
    const refreshToken = await refreshTokenService.deleteAllRefreshToken(req.userId);
    res.status(200).json({ message: "Delete all refresh token successfully", refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Delete all refresh token failed", error });
  }
};
export const refreshTokenController = {
  // addRefreshToken,
  // checkRevoked,
  // deleteRefreshToken,
  deleteAllRefreshToken,
};
