import { timeStamp } from "console";
import { Schema, model, Types } from "mongoose";
import { CourseType } from "../types/course";
import common from "./common.js";

const CourseSchema = new Schema<CourseType>(
  {
    name: common.name,
    description: common.description,
    main_img: common.main_img,
    other_src: common.other_src,
    overview: common.overview,
    what_you_will_learn: common.what_you_will_learn,
    who_is_this_course_for: common.who_is_this_course_for,
    fqa: common.fqa,
    duration: {
      type: Number,
      required: true,
    },
    lectures: {
      type: Number,
      required: true,
    },
    workshops: {
      type: Number,
      required: true,
    },
    real_projects: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    have_target: {
      type: Boolean,
      default: false,
    },
    is_dependent: {
      type: Boolean,
      default: false,
    },
    have_objectives: {
      type: Boolean,
      default: false,
    },
    objectives: [
      {
        name: {
          AR: String,
          EN: String,
        },
        description: {
          AR: String,
          EN: String,
        },
        icon: String,
      },
    ],
    related_courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export default model("Course", CourseSchema);
