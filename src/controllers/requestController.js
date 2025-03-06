import { requestService } from "~/services/requestService";
const createRequest = async (req, res, next) => {
  try {
    const { receiver } = req.body;
    const sender = req.user.id;
    const request = await requestService.createRequest(sender, receiver);
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};
const acceptRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipient = req.user.id;
    const request = await requestService.acceptRequest(id, recipient);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
const rejectRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipient = req.user.id;
    const request = await requestService.rejectRequest(id, recipient);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
const getRequestsByRecipient = async (req, res, next) => {
  try {
    const recipient = req.user.id;
    const requests = await requestService.getRequestsByRecipient(recipient);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
const getRequestsBySender = async (req, res, next) => {
  try {
    const sender = req.user.id;
    const requests = await requestService.getRequestsBySender(sender);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
const deleteFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipient = req.user.id;
    const request = await requestService.deleteFriend(recipient,id);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const requestController = {
  createRequest,
  acceptRequest,
  rejectRequest,
  getRequestsByRecipient,
  getRequestsBySender,
  deleteFriend,
};
