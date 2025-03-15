import admin from "~/config/firebaseConfig";

export const sendNotificationMessage = async (sender, chatId, message) => {
  try {
    let content = message.content;
    if (message.type === "image") {
      content = "Đã gửi ảnh";
    } else if (message.type === "audio") {
      content = "Đã gửi âm thanh";
    } else if (message.type === "video") {
      content = "Đã gửi video";
    }
    const payload = {
      notification: {
        title: sender.name,
        body: content,
      },
      data: {
        senderId: sender.id,
        senderName: sender.name,
        message: message,
        chatId: chatId,
      },
      topic: chatId,
    };
    const response = await admin.messaging().send(payload);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
export const sendNotificationRequest = async (sender, recipientToken) => {
  try {
    const payload = {
      notification: {
        title: sender.name,
        body: "Đã gửi lời mời kết bạn",
      },
      token: recipientToken,
    };
    const response = await admin.messaging().send(payload);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
export const sendNotificationAcceptRequest = async (sender, recipientToken) => {
  try {
    const payload = {
      notification: {
        title: sender.name,
        body: "Đã chấp nhận lời mời kết bạn",
      },
      data: {
        senderId: sender.id,
        senderName: sender.name,
        message: "Đã chấp nhận lời mời kết bạn",
      },
      topic: recipientToken,
    };
    const response = await admin.messaging().send(payload);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};


