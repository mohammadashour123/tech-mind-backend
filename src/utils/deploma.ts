import { checkArrayArEn, checkFQA, checkTextArEn } from "./index.js";
import { StringLang, StringLangs } from "../types/common";
import { DeplomaType, DeplomaCourse } from "../types/deploma";

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

export const checkIfCompletedDeploma = (deploma: DeplomaType) => {
  let msg = "Invalid ";

  if (!deploma) throw Error("Please Provide all Info to create the deploma");

  checkTextArEn(deploma.name, msg + "Name");
  checkTextArEn(deploma.description, msg + "Description");
  checkArrayArEn(deploma.overview, msg + "Overview");
  checkArrayArEn(deploma.what_you_will_learn, msg + "What you will learn text");
  checkFQA(deploma.fqa, msg + "FQA");

  if (!deploma.main_img) throw Error(msg + "Main Image");
  if (!deploma.other_src) throw Error(msg + "Secondary Image or Video");
};

export const getDeplomaDataFromBody = (deploma: DeplomaType): DeplomaType => {
  const {
    description,
    fqa,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
  } = deploma;

  return {
    description,
    fqa,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
    courses: [],
  };
};

export const getDeplomaCoursesData = (deplomaCourses: DeplomaCourse[]) => {
  let lectures = 0;
  let real_projects = 0;
  let workshops = 0;
  let duration = 0;
  let courses = deplomaCourses.map((ele) => {
    lectures += ele.duration;
    real_projects += ele.real_projects;
    workshops += ele.workshops;
    duration += ele.duration;
    const { _id, description, icon, name } = ele;
    return { _id, description, icon, name };
  });
  return { courses, lectures, real_projects, workshops, duration };
};
