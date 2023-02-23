import express from "express";
import courses from "./api/courses.js";
import deplomas from "./api/deplomas.js";
import reservations from "./api/reservations.js";
import messages from "./api/messages.js";

const router = express.Router();

router.use("/courses", courses);
router.use("/diplomas", deplomas);
router.use("/reservations", reservations);
router.use("/messages", messages);

export default router;
