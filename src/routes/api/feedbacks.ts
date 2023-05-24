import express from "express";
import Feedback from "../../controllers/api/feedbacks.js";

const router = express.Router();

router.get("/", Feedback.getAll);
router.post("/", Feedback.addOne);
router.get("/:id", Feedback.getOne);
router.delete("/:id", Feedback.deleteOne);

export default router;
