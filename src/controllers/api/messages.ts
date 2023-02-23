import Message, { MessageType } from "../../models/messages.js";
import { Request, Response } from "express";

import { checkId } from "../../utils/index.js";
import {
  checkIfCompletedMessage,
  getMessageFromBody,
} from "../../utils/message.js";

const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find();

    // return all diplomas
    res
      .status(200)
      .json({ ok: true, msg: "All Messages are here", data: messages });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get the reservations";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const addMessage = async (req: Request, res: Response): Promise<void> => {
  const body: MessageType = req.body;
  try {
    // return any error message if any
    checkIfCompletedMessage(body);
    // take the needed data from the body
    const message = getMessageFromBody(body);
    // add diploma to DB
    const newMessage = new Message(message);
    await newMessage.save();

    res.status(200).json({ ok: true, msg: "Successfully created" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    // check if valid id;
    checkId(id);
    //check if Message Exist
    const message = await Message.findByIdAndDelete(id);
    if (!message) throw Error("Invalid Id");

    res.status(200).json({ ok: true, msg: "Successfully Deleted" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

export { addMessage, getAllMessages, deleteMessage };
