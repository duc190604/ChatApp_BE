import { expressjwt } from "express-jwt";
import { env } from "~/config/environments";
import { refreshTokenService } from "~/services/refreshTokenService";
const isRevoked = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const revokedToken = await refreshTokenService.checkRevoked(token);
    return revokedToken;
  }else{
    return true;
  }
};
const authJwt = expressjwt({
  secret: env.JWT_SECRET_KEY,
  isRevoked: isRevoked,
  algorithms: ["HS256"],
  requestProperty: "user",
}).unless({
  path: [
    "/api/v1/user/login",
    "/api/v1/email/send-verify-email",
    "/api/v1/email/verify-email",
    new RegExp("/api/v1/upload/*"),
  ],
});

export default authJwt;
