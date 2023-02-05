import { response, Response } from "express";
import { Types } from "mongoose";

export const checkId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw Error("Invalid ID");
};
