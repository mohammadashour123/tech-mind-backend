import express from "express";
import {
  getAllMessages,
  addMessage,
  deleteMessage,
} from "../../controllers/api/messages.js";

const router = express.Router();

router.get("/", getAllMessages);
router.post("/", addMessage);
router.delete("/:id", deleteMessage);
// router.delete("/", deleteAllMessages);

export default router;
