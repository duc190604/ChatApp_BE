import { Friend } from "~/models/friend";
const isFriend = async (user1, user2) => {
  const friend = await Friend.findOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });
  return friend;
};
const createFriend = async (user1, user2) => {
  const friend = await Friend.create({ user1, user2 });
  return friend;
};
const blockFriend = async (user1, user2) => {
  const friend = await Friend.findOne({ user1, user2 });
  friend.userBlocked.push(user2);
  await friend.save();
  return friend;
};
export const friendService = {
  isFriend,
  createFriend,
  blockFriend,
};
