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
// import deploma from "../../deploma.js";

const getDeploma = async (req: Request, res: Response): Promise<void> => {
  // get deploma id
  const id = req.params.id;
  try {
    // check if deploma exist
    const deploma = await Deploma.findById(id);
    if (!deploma) {
      res.status(400).json({ ok: false, msg: "Invalid Deploma ID" });
      return;
    }

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

  // return any error message if any
  const perfectDeploma = checkIfCompletedDeploma(body);
  if (!perfectDeploma.ok) {
    res.status(400).json({ msg: perfectDeploma.msg, ok: false });
    return;
  }
  // take the needed data from the body
  const deploma = getDeplomaDataFromBody(body);
  try {
    // update the deploma
    const newDeploma = await Deploma.findByIdAndUpdate(id, deploma);
    if (!newDeploma) {
      res.status(400).json({ ok: false, msg: "Invalid Deploma ID" });
      return;
    }

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
    // delete the deploma
    const deploma = await Deploma.findByIdAndDelete(id);
    // if no deploma returned so there are no deploma exist with this id
    if (!deploma) {
      res.status(400).json({ msg: "Invalid Deploma ID", ok: false });
      return;
    }
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
    // check if course exist
    const isExistInDB = await Course.findById(courseID);
    if (!isExistInDB) {
      res.status(400).json({ ok: false, msg: "Invalid Course ID" });
      return;
    }
    // check if course added to the deploma before
    const isExistInDeploma = await Deploma.findOne({
      _id: id,
      courses: { $in: [courseID] },
    });
    if (isExistInDeploma) {
      res.status(400).json({ ok: false, msg: "Course is already exist" });
      return;
    }

    // update the deploma
    const deploma = await Deploma.findByIdAndUpdate(id, {
      $push: { courses: courseID },
    });

    // check if deploma exist
    if (!deploma) {
      res.status(400).json({ msg: "Invalid Deploma ID", ok: false });
      return;
    }

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
