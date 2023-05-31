import type { FeedbackType } from "../models/feedbacks";

export const checkIfCompletedFeedback = (feedback: FeedbackType) => {
  let msg = "Invalid ";

  if (!feedback)
    throw Error("Please Provide all Info to create the reservation");

  if (!feedback.author) throw Error(msg + "Author");
  if (!feedback.image) throw Error(msg + "Image");
  if (!feedback.feedback) throw Error(msg + "Feedback");
};

export const getFeedbackFromBody = (_feedback: FeedbackType) => {
  const { feedback, author, image } = _feedback;
  return { feedback, author, image };
};
