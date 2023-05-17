import Message, { MessageType } from "../../models/messages.js";
import { Request, Response } from "express";

import { checkId, getSkipLimit } from "../../utils/index.js";
import {
  checkIfCompletedMessage,
  getMessageFromBody,
} from "../../utils/message.js";

const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, skip } = getSkipLimit(req.query);
    const messages = await Message.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ ok: true, msg: "All Messages are here", data: messages });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get the messages";
    }
    res.status(400).json({ ok: false, msg });
  }
};
const getMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    const message = await Message.findById(id);
    if (!message) throw Error("Message Doen't exist!");

    // return all diplomas
    res
      .status(200)
      .json({ ok: true, msg: "The Message is here", data: message });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get the message";
    }
    res.status(400).json({ ok: false, msg });
  }
};

// (async () => {
//   let c = 0;
//   while (c < 1000) {
//     console.log(c + " started");
//     const newMessage = new Message({
//       email: "ahmed" + c + "@gmail.com",
//       message: "test " + c,
//       name: "test " + c,
//       phone: Math.ceil(Math.random() * 100000000),
//       subject: "test " + c++,
//     });
//     await newMessage.save();
//     console.log(c + " Finished");
//   }
// })();

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
      msg = "Unable to add this message";
    }
    res.status(400).json({ ok: false, msg });
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
      msg = "Unable to add this message";
    }
    res.status(400).json({ ok: false, msg });
  }
};

export { addMessage, getAllMessages, deleteMessage, getMessage };
