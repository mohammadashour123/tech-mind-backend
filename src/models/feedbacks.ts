import { Schema, model, Types } from "mongoose";

export interface FeedbackType {
  _id?: Types.ObjectId;
  author: string;
  feedback: string;
  image: string;
}

const FeedbackSchema = new Schema<FeedbackType>(
  {
    author: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Feedback", FeedbackSchema);
