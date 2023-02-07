import { Request, Response } from "express";
import Deploma from "../../models/deplomas.js";
import Course from "../../models/courses.js";
// import courses from "../../courses.js";

import { CourseType } from "../../types/course";
import {
  checkIfCompletedCourse,
  getCourseDataFromBody,
} from "../../utils/course.js";

import { checkId } from "../../utils/index.js";

const getCourse = async (req: Request, res: Response): Promise<void> => {
  // get course id
  const id: string = req.params.id;
  const deplomaId = req.query.deploma as string;

  try {
    checkId(id);

    let course;
    let deploma;
    // check if deploma id exist
    if (deplomaId) {
      checkId(deplomaId);
      deploma = await Deploma.findById(deplomaId).select(["name", "_id"]);
      if (!deploma) throw Error("Invalid Deploma ID");
      course = await Course.findById(id);
    } else {
      course = await Course.findOne({ _id: id, is_dependent: true });
    }

    // check if course exist
    if (!course) throw Error("Invalid Course ID");
    // return the course

    res
      .status(200)
      .json({ ok: true, msg: "Course is here", data: { course, deploma } });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get this course";
    }
    res.status(400).json({ ok: false, msg });
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
    res.status(400).json({ ok: false, msg });
  }
};

const addCourse = async (req: Request, res: Response): Promise<void> => {
  // get course data
  const body: CourseType = req.body;
  // return any error message if missing data
  const perfectCourse = checkIfCompletedCourse(body);
  if (!perfectCourse.ok) throw Error("perfectCourse.msg");
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
    res.status(400).json({ ok: false, msg });
  }
};

const updateCourse = async (req: Request, res: Response): Promise<void> => {
  // course id
  const id = req.params.id;

  // course new data
  const body = req.body;

  // return any error message if missing data
  const perfectCourse = checkIfCompletedCourse(body);
  if (!perfectCourse.ok) throw Error(perfectCourse.msg);
  // just take the needed data from the body
  const course = getCourseDataFromBody(body);

  try {
    // check if  course exists
    checkId(id);
    const newCourse = await Course.findByIdAndUpdate(id, course);
    if (!newCourse) throw Error("Invalid Course ID");

    res.status(200).json({ ok: true, msg: "Successfully Updated" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to update this course";
    }
    res.status(400).json({ ok: false, msg });
  }
};
const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  // get course id
  const _id: string = req.params.id;

  try {
    checkId(_id);
    // delete the course
    const course = await Course.findOneAndDelete({ _id });
    // check if course exist
    if (!course) throw Error("Invalid Course ID");

    // delete the course from other deplomas
    await Deploma.updateMany(
      { courses: { $in: _id } },
      { $pull: { courses: _id } }
    );

    res.status(200).json({ ok: true, msg: "Course Deleted Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to Delete this course";
    }
    res.status(400).json({ ok: false, msg });
  }
};

// related courses
const addRelatedCourses = async (req: Request, res: Response) => {
  // course will be updated
  const id = req.params.id;

  // course will be added
  const relatedCourseId = req.body.courseId;
  try {
    checkId(id);
    checkId(relatedCourseId);

    // check if mainCourse exist
    const mainCourse = await Course.findById(relatedCourseId);
    if (!mainCourse) throw Error("Invalid Course ID, the course will be added");

    // check if related course exist
    const relatedCourse = await Course.findById(relatedCourseId);
    if (!relatedCourse)
      throw Error("Invalid Course ID, the course will be added");

    // check if relatedCourse is exist in teh course
    const isCourseExist = await Course.findOne({
      _id: id,
      related_courses: { $in: [relatedCourse] },
    });
    if (isCourseExist) throw Error("Course Is Already Exist");

    // update
    const course = await Course.findByIdAndUpdate(id, {
      $push: { related_courses: relatedCourse },
    });

    if (!course) throw Error("Course didn't added");
    res.status(200).json({ ok: true, msg: "Course Added Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to Delete this course";
    }
    res.status(400).json({ ok: false, msg });
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
    checkId(id);
    const neededData = { _id: 1, name: 1, main_img: 1, description: 1 };

    // get parent deploma
    const relatedDeploma = await Deploma.findOne({
      courses: { $in: id },
    });
    // ckeck if there are a parent deploma
    // if no select a random 3 courses
    if (!relatedDeploma) {
      const course = await Course.findById(id);
      const relatedCourses = await Course.find({
        _id: { $in: course?.related_courses },
      }).select(neededData);

      res.status(200).json({
        ok: true,
        msg: "Related Courses is here",
        data: relatedCourses,
      });

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
    res.status(400).json({ ok: false, msg });
  }
};

export {
  getCourse,
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addRelatedCourses,
  getRelatedCourses,
};
