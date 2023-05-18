import Diploma from "../../models/diplomas.js";
import Course from "../../models/courses.js";
import Reservation, { ReservationType } from "../../models/reservation.js";
import { Request, Response } from "express";

import { checkId, getSkipLimit } from "../../utils/index.js";
import {
  checkIfCompletedReservation,
  getReservationFromBody,
} from "../../utils/reservation.js";

// (async () => {
//   await Reservation.deleteMany();
// })();

// (async () => {
//   let c = 0;
//   while (c < 500) {
//     console.log("Reservation Started " + c);
//     const reservationData = {
//       createdAt: "2023-02-19T12:31:33.257Z",
//       email: "a@g.com",
//       fromCourse: null,
//       fromDiploma: null,
//       id: "63f216a55433d81f967d1e56",
//       name: "ahmed",
//       phone: "01205875836",
//       tech_id:
//         Math.random() > 0.5
//           ? "64653e4d589305ef541bdc35"
//           : "64653dd1589305ef541bd7fb",
//       updatedAt: "2023-02-19T12:31:33.257Z",
//     };
//     const newReservation = new Reservation(reservationData);
//     await newReservation.save();
//     console.log("Reservation Finished " + c);

//     c++;
//   }
// })();

const getAllReservations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit, skip } = getSkipLimit(req.query);
    const reservations = await Reservation.find()
      .populate({ path: "fromCourse", select: ["name", "main_img"] })
      .populate({ path: "fromDiploma", select: ["name", "main_img"] })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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
