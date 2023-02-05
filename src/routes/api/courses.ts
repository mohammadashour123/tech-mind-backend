import express from "express";
import {
  addCourse,
  getRelatedCourses,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  addRelatedCourses,
} from "../../controllers/api/courses.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.patch("/related/:id", addRelatedCourses);
router.get("/related/:id", getRelatedCourses);

export default router;
