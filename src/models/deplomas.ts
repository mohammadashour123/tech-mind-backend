import { Schema, model, Types } from "mongoose";
import { DeplomaType } from "../types/deploma";
import common from "./common.js";

const DeplomaSchema = new Schema<DeplomaType>(
  {
    name: common.name,
    description: common.description,
    main_img: common.main_img,
    other_src: common.other_src,
    overview: common.overview,
    what_you_will_learn: common.what_you_will_learn,
    who_is_this_course_for: common.who_is_this_course_for,
    fqa: common.fqa,
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export default model("Deploma", DeplomaSchema);
