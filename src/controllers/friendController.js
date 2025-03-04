import { friendService } from "~/services/friendService";

const createFriend = async (req, res, next) => {
  try {
    const { user1, user2 } = req.body;
    const friend = await friendService.createFriend(user1, user2);
    res.status(201).json(friend);
  } catch (error) {
    next(error);
  }
};

