import { Server } from "socket.io";
import Chat from "~/models/chat";
import { sendNotificationAcceptRequest, sendNotificationRequest, sendNotificationMessage } from "./services/firebaseService";
let usersOnline = [];
const groupChats = {};
const getUserReceives = (senderId, chatId) => {
  const userReceives = groupChats[chatId]
    .filter((user) => user.userId !== senderId)
    .map((user) => {
      const onlineUser = usersOnline.find(
        (online) => online.userId === user.userId
      );
      return onlineUser ? onlineUser.socketId : null;
    })
    .filter((socketId) => socketId !== null);

  return userReceives;
};
export default (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    // lưu lại user vào mảng
    if (!usersOnline.some((user) => user.userId === userId)) {
      usersOnline.push({ userId, socketId: socket.id });
    }
    io.emit("getUsersOnline", usersOnline);
    //gửi tin nhắn
    socket.on("sendMessage", async ({ senderId, chatId, message }) => {
      if (!groupChats[chatId]) {
        const chat = await Chat.findById(chatId);
        groupChats[chatId] = chat.members;
      }
      const userReceives = getUserReceives(senderId, chatId);

      userReceives.forEach((socketId) => {
        if (socketId) {
          io.to(socketId).emit("getMessage", { senderId, message });
        }
      });
      sendNotificationMessage(senderId, chatId, message);
    });
    //đang soạn tin nhắn
    socket.on("typing", ({ senderId, chatId }) => {
      const userReceives = getUserReceives(senderId, chatId);
      userReceives.forEach((socketId) => {
          io.to(socketId).emit("typing", { senderId, chatId });
      });
    });
    //ngừng soạn tin nhắn
    socket.on("stopTyping", ({ senderId, chatId }) => {
      const userReceives = getUserReceives(senderId, chatId);
      userReceives.forEach((socketId) => { 
          io.to(socketId).emit("stopTyping", { senderId, chatId });
      });
    });
    //seen message
    socket.on("seenMessage", ({ senderId, chatId, messageId }) => {
      const userReceives = getUserReceives(senderId, chatId);
      userReceives.forEach((socketId) => {
        if (socketId) {
          io.to(socketId).emit("seenMessage", { senderId, chatId, messageId });
        }
      });
    });
    //gửi request
    socket.on("sendRequest", async ({ senderId, recipientId }) => {
      const user = usersOnline.find((user) => user.userId === recipientId);
      if (user) {
        io.to(user.socketId).emit("getRequest", { senderId });
        await sendNotificationRequest(senderId, user.socketId);
      }

    });
    //accept request
    socket.on("acceptRequest", async ({ senderId, recipientId }) => {
      const user = usersOnline.find((user) => user.userId === senderId);
      if (user) {
        io.to(user.socketId).emit("acceptRequest", { recipientId });
        await sendNotificationAcceptRequest(senderId, user.socketId);
      }
    });
    //logout
    socket.on("logout", ({ userId }) => {
      usersOnline = usersOnline.filter((user) => user.userId !== userId);
      io.emit("getUsersOnline", usersOnline);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      usersOnline = usersOnline.filter((user) => user.id !== socket.id);
    });
  });
};
