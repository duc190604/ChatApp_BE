import { sendEmail } from "~/services/emailService";
import User from "~/models/user";
import { generateToken, verifyToken } from "~/utils/auth";
let codeVerify = {};
const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codeVerify[email] = code;
  await sendEmail(email, "Verify your email", code);
  setTimeout(() => {
    delete codeVerify[email];
  }, 5 * 60 * 1000);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    next(error);
  }
};
const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
    if (codeVerify[email] !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }
    const token = await generateToken(email, "5m", "email");
    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    res.status(200).json({ message: "Email verified", token: token });
  } catch (error) {
    next(error);
  }
};
export const emailController = {
  sendVerifyEmail,
  verifyEmail,
};
