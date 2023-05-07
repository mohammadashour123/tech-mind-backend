import express from "express";
import {
  addCourse,
  getRelatedCourses,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  addRelatedCourse,
  deleteRelatedCourse,
} from "../../controllers/api/courses.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/related/:id", getRelatedCourses);
router.post("/related/:id", addRelatedCourse);
router.delete("/related/:id", deleteRelatedCourse);

export default router;
