import { checkId } from "./index.js";
import reservation, { ReservationType } from "../models/reservation";

export const checkIfCompletedReservation = (reservation: ReservationType) => {
  let msg = "Invalid ";

  if (!reservation)
    throw Error("Please Provide all Info to create the reservation");

  if (!reservation.name) throw Error(msg + "Name");
  if (!reservation.email) throw Error(msg + "Email");
  if (!reservation.phone) throw Error(msg + "Phone");
  if (!reservation.tech_id) throw Error(msg + "Tech Id (diploma/course)");

  const tech_id = reservation.tech_id as string;
  try {
    checkId(tech_id);
  } catch (err) {
    throw Error("Invalid tech_id");
  }
};

export const getReservationFromBody = (reservation: ReservationType) => {
  const { email, name, phone, tech_id } = reservation;
  return { email, name, phone, tech_id };
};
