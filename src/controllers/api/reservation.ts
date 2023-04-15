import Diploma from "../../models/diplomas.js";
import Course from "../../models/courses.js";
import Reservation, { ReservationType } from "../../models/reservation.js";
import { Request, Response } from "express";

import { checkId } from "../../utils/index.js";
import {
  checkIfCompletedReservation,
  getReservationFromBody,
} from "../../utils/reservation.js";

const getAllReservations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reservations = await Reservation.find()
      .populate({ path: "fromCourse", select: ["name", "main_img"] })
      .populate({ path: "fromDiploma", select: ["name", "main_img"] });

    // return all diplomas
    res
      .status(200)
      .json({ ok: true, msg: "All Reservations are here", data: reservations });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to get the reservations";
    }
    res.status(400).json({ ok: false, msg });
  }
};

const addReservation = async (req: Request, res: Response): Promise<void> => {
  const body: ReservationType = req.body;
  try {
    // return any error message if any
    checkIfCompletedReservation(body);
    // take the needed data from the body
    const reservation = getReservationFromBody(body);
    // add diploma to DB
    const newReservation = new Reservation(reservation);
    await newReservation.save();

    res.status(200).json({ ok: true, msg: "Successfully created" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      console.log(err.message);
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: false, msg });
  }
};

const deleteReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    // check if valid id;
    checkId(id);
    //check if Reservation Exist
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) throw Error("Invalid Id");

    res.status(200).json({ ok: true, msg: "Successfully Deleted" });
  } catch (err) {
    let msg = "";
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = "Unable to add this diploma";
    }
    res.status(400).json({ ok: false, msg });
  }
};

export { addReservation, getAllReservations, deleteReservation };
