import {
  checkArrayArEn,
  checkFQA,
  checkNumber,
  checkTextArEn,
} from "./index.js";
import { StringLangs } from "../types/common";
import { CourseType } from "../types/course";

export const checkIfCompletedCourse = (course: CourseType) => {
  let msg = "Invalid ";

  if (!course) throw Error("Please Provide all Info to create the course");

  checkTextArEn(course.name, msg + "Name");
  checkTextArEn(course.description, msg + "Description");
  checkArrayArEn(course.overview, msg + "Overview");
  checkArrayArEn(course.what_you_will_learn, msg + "What you will learn text");
  checkFQA(course.fqa, "FQA");
  checkNumber(course.duration, msg + "Duration");
  checkNumber(course.lectures, msg + "Lectures");
  checkNumber(course.workshops, msg + "Workshops");
  checkNumber(course.real_projects, msg + "Real Projects");

  if (course.have_target) {
    const whoIsThisCourseFor = course.who_is_this_course_for as StringLangs;
    checkArrayArEn(
      whoIsThisCourseFor,
      "the course have target put 'who is this course made for' text"
    );
  }

  if (course.have_objectives) {
    const objective = course.objectives as ObjectivesType[];
    checkIfCourseHaveObjectives(
      objective,
      "Course Objectives is missing and the course have objectives"
    );
  }

  if (!course.main_img) throw Error(msg + "Main Image");
  if (!course.other_src) throw Error(msg + "Secondary Image or Video");
  if (!course.icon) throw Error(msg + "Icon");
};

export const getCourseDataFromBody = (course: CourseType): CourseType => {
  const {
    description,
    fqa,
    have_target,
    is_dependent,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
    icon,
    duration,
    lectures,
    real_projects,
    workshops,
    have_objectives,
    objectives,
  } = course;

  return {
    description,
    fqa,
    have_target,
    is_dependent,
    main_img,
    name,
    other_src,
    overview,
    what_you_will_learn,
    who_is_this_course_for,
    icon,
    duration: parseInt(`${duration}`),
    lectures: parseInt(`${lectures}`),
    real_projects: parseInt(`${real_projects}`),
    workshops: parseInt(`${workshops}`),
    have_objectives,
    objectives,
  };
};

// helper functions

interface ObjectivesType {
  name: {
    EN: string;
    AR: string;
  };
  description: {
    EN: string;
    AR: string;
  };
  icon: string;
}

const checkIfCourseHaveObjectives = (
  objectives: ObjectivesType[],
  message: string
) => {
  console.log(JSON.stringify(objectives));
  if (!objectives || objectives.length < 1) throw Error(message);
  objectives.forEach((objective) => {
    if (
      !objective.name ||
      !objective.name.EN ||
      !objective.name.AR ||
      !objective.description.EN ||
      !objective.description.AR ||
      !objective.icon
    ) {
      throw Error(message);
    }
  });
};
