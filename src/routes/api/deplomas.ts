import express from "express";
import {
  addDeploma,
  deleteDeploma,
  getAllDeplomas,
  getDeploma,
  updateDeploma,
  addDeplomaCourse,
} from "../../controllers/api/deplomas.js";

const router = express.Router();

router.get("/", getAllDeplomas);
router.get("/:id", getDeploma);
router.post("/", addDeploma);
router.put("/:id", updateDeploma);
router.delete("/:id", deleteDeploma);
router.patch("/course/:id", addDeplomaCourse);

export default router;
