import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
import { env } from "~/config/environments";
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (userId, expiresIn, type) => {
  const payload = {
    id: userId,
    type: type,
  };
  const token = await jwt.sign(payload, env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return decoded;
  } catch (error) {
    return null;
  }
};
