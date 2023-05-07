import express from "express";
import {
  getAllMessages,
  addMessage,
  deleteMessage,
  getMessage,
} from "../../controllers/api/messages.js";

const router = express.Router();

router.get("/", getAllMessages);
router.post("/", addMessage);
router.get("/:id", getMessage);
router.delete("/:id", deleteMessage);

export default router;
