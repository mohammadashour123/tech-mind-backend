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

router.post("/auth", (req, res) => {
  const { username, password } = req.body;
  const { NAME, PASSWORD } = process.env;

  if (username === NAME && password === PASSWORD) {
    res.status(200).json({ ok: true, token: Math.random() * Date.now() });
  } else {
    res.status(401).json({ ok: false, msg: "UnAuthorized User" });
  }
});

export default router;
