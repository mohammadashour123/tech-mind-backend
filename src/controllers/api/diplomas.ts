import Diploma from "../../models/diplomas.js";
import Course from "../../models/courses.js";
import { Request, Response } from "express";
import { DiplomaType, DiplomaCourse } from "../../types/diploma";
import {
  checkIfCompletedDiploma,
  getDiplomaCoursesData,
  getDiplomaDataFromBody,
  couresDataToSelecte,
} from "../../utils/diploma.js";
import { checkId } from "../../utils/index.js";
// import diploma from "../../diploma.js";

const getDiploma = async (req: Request, res: Response): Promise<void> => {
  // get diploma id
  const id = req.params.id;
  try {
    checkId(id);

    // check if diploma exist
    const diploma = await Diploma.findById(id);
    if (!diploma) throw Error("Invalid Diploma ID");

    // get diploma courses
    const diplomaCoursesPromises = diploma.courses.map(async (course) => {
      return await Course.findById(course._id).select(couresDataToSelecte);
    });

    // get diploma courses data
    const diplomaCoursesResponse = await Promise.all(diplomaCoursesPromises);
    const diplomaCourses = diplomaCoursesResponse as unknown as DiplomaCourse[];
    const diplomaCoursesData = getDiplomaCoursesData(diplomaCourses);

    // return the diploma with the data
    res.status(200).json({
      ok: true,
      msg: "Diploma Is here",
      data: { ...diploma.toObject(), ...diplomaCoursesData },
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

const getAllDiplomas = async (req: Request, res: Response): Promise<void> => {
  try {
    const diplomas = await Diploma.find();
    // return all diplomas
    res
      .status(200)
      .json({ ok: true, msg: "Diplomas are here", data: diplomas });
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

const addDiploma = async (req: Request, res: Response): Promise<void> => {
  const body: DiplomaType = req.body;
  try {
    // return any error message if any
    checkIfCompletedDiploma(body);
    // take the needed data from the body
    const diploma = getDiplomaDataFromBody(body);
    // add diploma to DB
    const createdDiploma = new Diploma(diploma);
    await createdDiploma.save();

    res.status(200).json({ ok: true, msg: "Successfully created" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const updateDiploma = async (req: Request, res: Response): Promise<void> => {
  // diploma id
  const id: string = req.params.id;

  // diploma body
  const body: DiplomaType = req.body;

  try {
    checkId(id);

    // return any error message if any
    checkIfCompletedDiploma(body);

    // take the needed data from the body
    const diploma = getDiplomaDataFromBody(body);

    // update the diploma
    const newDiploma = await Diploma.findByIdAndUpdate(id, diploma);
    if (!newDiploma) throw Error("Invalid Diploma ID");

    // return successful message
    res.status(200).json({ ok: true, msg: "Successfully Updated" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const deleteDiploma = async (req: Request, res: Response): Promise<void> => {
  // get diploma id
  const id = req.params.id;
  try {
    checkId(id);

    // delete the diploma
    const diploma = await Diploma.findByIdAndDelete(id);
    // if no diploma returned so there are no diploma exist with this id
    if (!diploma) throw Error("Invalid Diploma ID");
    res.status(200).json({ ok: true, msg: "Deleted Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

const addDiplomaCourse = async (req: Request, res: Response): Promise<void> => {
  // diploma id
  const id = req.params.id;
  // course id
  const courseID = req.body.course_id;
  try {
    checkId(id);
    checkId(courseID);

    // check if course exist
    const isExistInDB = await Course.findById(courseID);
    if (!isExistInDB) throw Error("Invalid Course ID");

    // check if course added to the diploma before
    const isExistInDiploma = await Diploma.findOne({
      _id: id,
      courses: { $in: [courseID] },
    });

    if (isExistInDiploma) throw Error("Course is already exist");

    // update the diploma
    const diploma = await Diploma.findByIdAndUpdate(id, {
      $push: { courses: courseID },
    });

    // check if diploma exist
    if (!diploma) throw Error("Invalid Diploma ID");

    res
      .status(200)
      .json({ ok: true, msg: "Course added to diploma Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};
const deleteDiplomaCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  // diploma id
  const id = req.params.id;
  // course id
  const courseID = req.body.course_id;
  try {
    checkId(id);
    checkId(courseID);

    // check if course exist
    const isExistInDB = await Course.findById(courseID);
    if (!isExistInDB) throw Error("Invalid Course ID");

    // check if course added to the diploma before
    const isExistInDiploma = await Diploma.findOne({
      _id: id,
      courses: { $in: [courseID] },
    });

    if (!isExistInDiploma) throw Error("Course isn't in diploma");

    // update the diploma
    const diploma = await Diploma.findByIdAndUpdate(id, {
      $pull: { courses: courseID },
    });

    // check if diploma exist
    if (!diploma) throw Error("Invalid Diploma ID");

    res
      .status(200)
      .json({ ok: true, msg: "Course removed from diploma Successfully" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: true, msg });
  }
};

export {
  getDiploma,
  getAllDiplomas,
  addDiploma,
  updateDiploma,
  deleteDiploma,
  addDiplomaCourse,
  deleteDiplomaCourse,
};
