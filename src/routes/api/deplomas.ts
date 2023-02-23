import express from "express";
import {
  addDiploma,
  deleteDiploma,
  getAllDiplomas,
  getDiploma,
  updateDiploma,
  addDiplomaCourse,
  deleteDiplomaCourse,
} from "../../controllers/api/diplomas.js";

const router = express.Router();

router.get("/", getAllDiplomas);
router.get("/:id", getDiploma);
router.post("/", addDiploma);
router.put("/:id", updateDiploma);
router.delete("/:id", deleteDiploma);
router.post("/course/:id", addDiplomaCourse);
router.delete("/course/:id", deleteDiplomaCourse);

export default router;
