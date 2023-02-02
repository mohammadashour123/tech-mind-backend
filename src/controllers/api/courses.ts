import { Request, Response } from "express";
import Deploma from "../../models/deplomas.js";
import Course from "../../models/courses.js";

import { CourseType } from "../../types/course";
import {
  checkIfCompletedCourse,
  getCourseDataFromBody,
} from "../../utils/course.js";

const getCourse = async (req: Request, res: Response): Promise<void> => {
  // get course id
  const id: string = req.params.id;
  try {
    // check if course exist
    const course = await Course.findById(id);
    if (!course) {
      res.status(400).json({ ok: false, msg: "Invalid Course ID" });
      return;
    }
    // return the course
    res.status(200).json({ ok: true, msg: "Course is here", data: course });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get this course";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const getRelatedCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // get course id
    const id = req.params.id;
    // data needed from related courses
    const neededData = { _id: 1, name: 1, main_img: 1 };

    // get parent deploma
    const relatedDeploma = await Deploma.findOne({
      courses: { $in: id },
    });
    // ckeck if there are a parent deploma
    // if no select a random 3 courses
    if (!relatedDeploma) {
      const anyCourses = await Course.aggregate([
        { $match: { _id: { $ne: id } } },
        { $sample: { size: 3 } },
        { $project: neededData },
      ]);
      res
        .status(200)
        .json({ ok: true, msg: "Related Courses is here", data: anyCourses });

      return;
    }
    // if they have a parent deploma select a 3 courses
    const relatedCoursesPromises = relatedDeploma.courses
      .filter((course) => !course.equals(id))
      .map((course) => course.toString())
      .slice(0, 3)
      .map(async (id) => {
        const course = await Course.findById(id).select(neededData);
        return course;
      });
    // wait until they return
    const relatedCourses = await Promise.all(relatedCoursesPromises);

    res
      .status(200)
      .json({ ok: true, msg: "Related Courses is here", data: relatedCourses });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to Get all courses";
    }
    res.status(400).json({ ok: true, msg });
  }
};
const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    // get and send all courses
    const courses = await Course.find();
    res
      .status(200)
      .json({ ok: true, msg: "All Courses is here", data: courses });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to Get all courses";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const addCourse = async (req: Request, res: Response): Promise<void> => {
  // get course data
  const body: CourseType = req.body;
  // return any error message if missing data
  const perfectCourse = checkIfCompletedCourse(body);
  if (!perfectCourse.ok) {
    res.status(400).json({ msg: perfectCourse.msg, ok: false });
    return;
  }
  // take the needed data from the body
  const course = getCourseDataFromBody(body);
  try {
    // add course to courses
    const createdCourse = new Course(course);
    await createdCourse.save();
    // return msg
    res.status(200).json({ ok: true, msg: "Successfully created" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this course";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const updateCourse = async (req: Request, res: Response): Promise<void> => {
  // course id
  const id = req.params.id;
  // course new data
  const body = req.body;

  // return any error message if missing data
  const perfectCourse = checkIfCompletedCourse(body);
  if (!perfectCourse.ok) {
    res.status(400).json({ msg: perfectCourse.msg, ok: false });
    return;
  }
  // just take the needed data from the body
  const course = getCourseDataFromBody(body);

  try {
    // check if  course exists
    const newCourse = await Course.findByIdAndUpdate(id, course);
    if (!newCourse) {
      res.status(400).json({ ok: false, msg: "Invalid Course ID" });
      return;
    }
    res.status(200).json({ ok: true, msg: "Successfully Updated" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to update this course";
    }
    res.status(400).json({ ok: true, msg });
  }
};
const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  // get course id
  const _id: string = req.params.id;
  try {
    // delete the course
    const course = await Course.findOneAndDelete({ _id });
    // check if course exist
    if (!course) {
      res.status(400).json({ ok: false, msg: "Invalid Course ID" });
      return;
    }
    res.status(200).json({ ok: true, msg: "Course Deleted Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to Delete this course";
    }
    res.status(400).json({ ok: true, msg });
  }
};

export {
  getCourse,
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getRelatedCourses,
};
