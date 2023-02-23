import express from "express";
import {
  getAllReservations,
  addReservation,
  deleteReservation,
} from "../../controllers/api/reservation.js";

const router = express.Router();

router.get("/", getAllReservations);
router.post("/", addReservation);
router.delete("/:id", deleteReservation);
// router.delete("/", deleteAllReservations);

export default router;
