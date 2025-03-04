import Chat from "~/models/chat";
const createPrivateChat = async (sender, recipient) => {
  const chat = await Chat.create({
    members: [sender, recipient],
  });
  return chat;
};
export const chatService = {
  createPrivateChat,
};
