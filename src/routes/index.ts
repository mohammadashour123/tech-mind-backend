import express from "express";
import courses from "./api/courses.js";
import deplomas from "./api/deplomas.js";

const router = express.Router();

router.use("/courses", courses);
router.use("/deplomas", deplomas);

export default router;
