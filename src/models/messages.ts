import { Schema, model, Types } from "mongoose";

export interface MessageType {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const MessageSchema = new Schema<MessageType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Message", MessageSchema);
