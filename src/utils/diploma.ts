import { checkArrayArEn, checkFQA, checkTextArEn } from "./index.js";
import { StringLang, StringLangs } from "../types/common";
import { DiplomaType, DiplomaCourse } from "../types/diploma";

export const couresDataToSelecte = [
  "_id",
  "name",
  "description",
  "icon",
  "duration",
  "workshops",
  "real_projects",
  "lectures",
];

export const checkIfCompletedDiploma = (diploma: DiplomaType) => {
  let msg = "Invalid ";

  if (!diploma) throw Error("Please Provide all Info to create the diploma");

  checkTextArEn(diploma.name, msg + "Name");
  checkTextArEn(diploma.description, msg + "Description");
  checkArrayArEn(diploma.overview, msg + "Overview");
  checkArrayArEn(diploma.what_you_will_learn, msg + "What you will learn text");
  checkFQA(diploma.fqa, msg + "FQA");

  if (!diploma.main_img) throw Error(msg + "Main Image");
  if (!diploma.other_src) throw Error(msg + "Secondary Image or Video");
};

export const getDiplomaDataFromBody = (diploma: DiplomaType): DiplomaType => {
  const {
    description,
    fqa,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
    have_video,
  } = diploma;

  return {
    description,
    fqa,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
    have_video,
  };
};

export const getDiplomaCoursesData = (diplomaCourses: DiplomaCourse[]) => {
  let lectures = 0;
  let real_projects = 0;
  let workshops = 0;
  let duration = 0;
  let courses = diplomaCourses.map((ele) => {
    lectures += ele.lectures;
    real_projects += ele.real_projects;
    workshops += ele.workshops;
    duration += ele.duration;
    const { _id, description, icon, name } = ele;
    return { _id, description, icon, name };
  });
  return { courses, lectures, real_projects, workshops, duration };
};
