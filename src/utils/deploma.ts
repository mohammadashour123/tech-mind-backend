import { DeplomaType, DeplomaCourse } from "../types/deploma";
interface deplomaReturn {
  ok: boolean;
  msg: string;
}
export const couresDataToSelected = [
  "_id",
  "name",
  "description",
  "icon",
  "duration",
  "workshops",
  "real_projects",
  "lectures",
];
export const checkIfCompletedDeploma = (
  deploma: DeplomaType
): deplomaReturn => {
  let ok = false;
  let msg = "Invalid ";

  if (!deploma) {
    return {
      ok: false,
      msg: "Please Provide all Info to create the deploma",
    };
  }

  if (!deploma.name || !deploma.name.AR || !deploma.name.EN) {
    msg += "Name";
  } else if (
    !deploma.description ||
    !deploma.description.AR ||
    !deploma.description.EN
  ) {
    msg += "Description";
  } else if (
    !deploma.overview ||
    !deploma.overview.AR ||
    !deploma.overview.EN ||
    deploma.overview.AR.length < 1 ||
    deploma.overview.EN.length < 1
  ) {
    msg += "Overview";
  } else if (!deploma.main_img) msg += "Main Image";
  else if (!deploma.other_src) msg += "Secondary Image or Video";
  else if (
    !deploma.what_you_will_learn ||
    !deploma.what_you_will_learn.AR ||
    !deploma.what_you_will_learn.EN ||
    deploma.what_you_will_learn.AR.length < 1 ||
    deploma.what_you_will_learn.EN.length < 1
  ) {
    msg += "What you will learn text";
  } else if (
    !deploma.fqa ||
    deploma.fqa.length < 1 ||
    !deploma.fqa[0].q ||
    !deploma.fqa[0].a ||
    !deploma.fqa[0].q.AR ||
    !deploma.fqa[0].q.EN ||
    !deploma.fqa[0].a.AR ||
    !deploma.fqa[0].a.EN ||
    deploma.fqa[0].a.AR.length < 1 ||
    deploma.fqa[0].a.EN.length < 1
  ) {
    msg += "FQA";
  } else {
    return { ok: true, msg: "" };
  }
  return { ok, msg };
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
