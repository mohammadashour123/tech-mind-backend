import { CourseType } from "../types/course";
interface courseReturn {
  ok: boolean;
  msg: string;
}

export const checkIfCompletedCourse = (course: CourseType): courseReturn => {
  let ok = false;
  let msg = "Invalid ";
  console.log(course.duration);

  if (!course) {
    return {
      ok: false,
      msg: "Please Provide all Info to create the course",
    };
  }

  if (!course.name || !course.name.AR || !course.name.EN) {
    msg += "Name";
  } else if (
    !course.description ||
    !course.description.AR ||
    !course.description.EN
  ) {
    msg += "Description";
  } else if (
    !course.overview ||
    !course.overview.AR ||
    !course.overview.EN ||
    course.overview.AR.length < 1 ||
    course.overview.EN.length < 1
  ) {
    msg += "Overview";
  } else if (!course.main_img) msg += "Main Image";
  else if (!course.other_src) msg += "Secondary Image or Video";
  else if (!course.icon) msg += "Icon";
  else if (
    !course.what_you_will_learn ||
    !course.what_you_will_learn.AR ||
    !course.what_you_will_learn.EN ||
    course.what_you_will_learn.AR.length < 1 ||
    course.what_you_will_learn.EN.length < 1
  ) {
    msg += "What you will learn text";
  } else if (
    course.have_target &&
    (!course.who_is_this_course_for ||
      !course.who_is_this_course_for.AR ||
      !course.who_is_this_course_for.EN ||
      course.who_is_this_course_for.AR.length < 1 ||
      course.who_is_this_course_for.EN.length < 1)
  ) {
    msg += "the course have target put 'who is this course made for' text";
  } else if (
    !course.fqa ||
    course.fqa.length < 1 ||
    !course.fqa[0].q ||
    !course.fqa[0].a
  ) {
    msg += "FQA";
  } else if (typeof course.duration !== "number" || course.duration <= 0) {
    msg += "Duration";
  } else if (typeof course.lectures !== "number" || course.lectures <= 0) {
    msg += "Lectures";
  } else if (typeof course.workshops !== "number" || course.workshops <= 0) {
    msg += "Workshops";
  } else if (
    typeof course.real_projects !== "number" ||
    course.real_projects <= 0
  ) {
    msg += "Real Projects";
  } else {
    return { ok: true, msg: "" };
  }
  return { ok, msg };
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
    related_courses,
    what_you_will_learn,
    who_is_this_course_for,
    icon,
    duration,
    lectures,
    real_projects,
    workshops,
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
    related_courses,
    what_you_will_learn,
    who_is_this_course_for,
    icon,
    duration,
    lectures,
    real_projects,
    workshops,
  };
};
