import Feedback, { FeedbackType } from "../../models/feedbacks.js";
import { Request, Response } from "express";

import { checkId, getSkipLimit } from "../../utils/index.js";
import {
  checkIfCompletedFeedback,
  getFeedbackFromBody,
} from "../../utils/feedback.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, skip } = getSkipLimit(req.query);
    const feedbacks = await Feedback.find().skip(skip).limit(limit);

    res
      .status(200)
      .json({ ok: true, msg: "All Feedbacks are here", data: feedbacks });
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
const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    const feedback = await Feedback.findById(id);
    if (!feedback) throw Error("Feedback Doen't exist!");

    // return all diplomas
    res
      .status(200)
      .json({ ok: true, msg: "The Feedback is here", data: feedback });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get the feedback";
    }
    res.status(400).json({ ok: false, msg });
  }
};

// (async () => {
//   // delete all
//   await Feedback.deleteMany();
// })();

// (async () => {
//   let c = 0;
//   while (c < 1000) {
//     console.log(c + " started");
//     const newMessage = new Feedback({
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

const addOne = async (req: Request, res: Response): Promise<void> => {
  const body: FeedbackType = req.body;
  try {
    // return any error message if any
    checkIfCompletedFeedback(body);
    // take the needed data from the body
    const FeedbackType = getFeedbackFromBody(body);
    // add diploma to DB
    const newFeedback = new Feedback(FeedbackType);
    await newFeedback.save();

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

const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    // check if valid id;
    checkId(id);
    //check if Feedback Exist
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) throw Error("Invalid Id");

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

export default { addOne, deleteOne, getAll, getOne };
