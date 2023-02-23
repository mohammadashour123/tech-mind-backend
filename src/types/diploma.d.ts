import { Types } from "mongoose";
import { StringLang, StringLangs, SimpleCourse } from "./common";

export interface DiplomaType extends SimpleCourse {
  who_is_this_course_for: StringLangs;
  courses: Types.ObjectId[];
}
export interface DiplomaCourse {
  _id: Types.ObjectId;
  duration: number;
  workshops: number;
  lectures: number;
  real_projects: number;
  name: StringLang;
  description: StringLang;
  icon: string;
}
