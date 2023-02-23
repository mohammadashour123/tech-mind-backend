import { MessageType } from "../models/messages";

export const checkIfCompletedMessage = (message: MessageType) => {
  let msg = "Invalid ";

  if (!message)
    throw Error("Please Provide all Info to create the reservation");

  if (!message.name) throw Error(msg + "Name");
  if (!message.email) throw Error(msg + "Email");
  if (!message.phone) throw Error(msg + "Phone");
  if (!message.subject) throw Error(msg + "Subject");
  if (!message.message) throw Error(msg + "Message");
};

export const getMessageFromBody = (reservation: MessageType) => {
  const { email, name, phone, message, subject } = reservation;
  return { email, name, phone, message, subject };
};
