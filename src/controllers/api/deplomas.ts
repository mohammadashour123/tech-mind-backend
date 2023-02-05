import Deploma from "../../models/deplomas.js";
import Course from "../../models/courses.js";
import { Request, Response } from "express";
import { DeplomaType, DeplomaCourse } from "../../types/deploma";
import {
  checkIfCompletedDeploma,
  getDeplomaCoursesData,
  getDeplomaDataFromBody,
  couresDataToSelected,
} from "../../utils/deploma.js";
import { checkId } from "../../utils/index.js";
// import deploma from "../../deploma.js";

const getDeploma = async (req: Request, res: Response): Promise<void> => {
  // get deploma id
  const id = req.params.id;
  try {
    checkId(id);

    // check if deploma exist
    const deploma = await Deploma.findById(id);
    if (!deploma) throw Error("Invalid Deploma ID");

    // get deploma courses
    const deplomaCoursesPromises = deploma.courses.map(async (course) => {
      return await Course.findById(course._id).select(couresDataToSelected);
    });

    // get deploma courses data
    const deplomaCoursesResponse = await Promise.all(deplomaCoursesPromises);
    const deplomaCourses = deplomaCoursesResponse as unknown as DeplomaCourse[];
    const deplomaCoursesData = getDeplomaCoursesData(deplomaCourses);

    // return the deploma with the data
    res.status(200).json({
      ok: true,
      msg: "Deploma Is here",
      data: { ...deploma.toObject(), ...deplomaCoursesData },
    });
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

const getAllDeplomas = async (req: Request, res: Response): Promise<void> => {
  try {
    const deplomas = await Deploma.find();
    // return all deplomas
    res
      .status(200)
      .json({ ok: true, msg: "Deplomas are here", data: deplomas });
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

const addDeploma = async (req: Request, res: Response): Promise<void> => {
  const body: DeplomaType = req.body;
  // return any error message if any
  const perfectDeploma = checkIfCompletedDeploma(body);
  if (!perfectDeploma.ok) {
    res.status(400).json({ msg: perfectDeploma.msg, ok: false });
    return;
  }
  // take the needed data from the body
  const deploma = getDeplomaDataFromBody(body);
  try {
    // add deploma to DB
    const createdDeploma = new Deploma(deploma);
    await createdDeploma.save();

    res.status(200).json({ ok: true, msg: "Successfully created" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this deploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const updateDeploma = async (req: Request, res: Response): Promise<void> => {
  // deploma id
  const id: string = req.params.id;

  // deploma body
  const body: DeplomaType = req.body;

  try {
    checkId(id);

    // return any error message if any
    const perfectDeploma = checkIfCompletedDeploma(body);
    if (!perfectDeploma.ok) throw Error(perfectDeploma.msg);

    // take the needed data from the body
    const deploma = getDeplomaDataFromBody(body);

    // update the deploma
    const newDeploma = await Deploma.findByIdAndUpdate(id, deploma);
    if (!newDeploma) throw Error("Invalid Deploma ID");

    // return successful message
    res.status(200).json({ ok: true, msg: "Successfully Updated" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this deploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const deleteDeploma = async (req: Request, res: Response): Promise<void> => {
  // get deploma id
  const id = req.params.id;
  try {
    checkId(id);

    // delete the deploma
    const deploma = await Deploma.findByIdAndDelete(id);
    // if no deploma returned so there are no deploma exist with this id
    if (!deploma) throw Error("Invalid Deploma ID");
    res.status(200).json({ ok: true, msg: "Deleted Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this deploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const addDeplomaCourse = async (req: Request, res: Response): Promise<void> => {
  // deploma id
  const id = req.params.id;
  // course id
  const courseID = req.body.course_id;
  try {
    checkId(id);
    checkId(courseID);

    // check if course exist
    const isExistInDB = await Course.findById(courseID);
    if (!isExistInDB) throw Error("Invalid Course ID");

    // check if course added to the deploma before
    const isExistInDeploma = await Deploma.findOne({
      _id: id,
      courses: { $in: [courseID] },
    });

    if (isExistInDeploma) throw Error("Course is already exist");

    // update the deploma
    const deploma = await Deploma.findByIdAndUpdate(id, {
      $push: { courses: courseID },
    });

    // check if deploma exist
    if (!deploma) throw Error("Invalid Deploma ID");

    res
      .status(200)
      .json({ ok: true, msg: "Course added to deploma Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this deploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

export {
  getDeploma,
  getAllDeplomas,
  addDeploma,
  updateDeploma,
  deleteDeploma,
  addDeplomaCourse,
};
