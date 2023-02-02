import express from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes/index.js";
import { connect, set } from "mongoose";

const app = express();

// middle ware
app.use(logger("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api", routes);

const PORT: number | string = process.env.PORT || 8000;
const MONGO_SECRET = process.env.MONGO_SECRET || "";

set("strictQuery", false);
connect(MONGO_SECRET)
  .then(() =>
    app.listen(PORT, () =>
      console.log("Connected to DB && Listening on PORT " + PORT)
    )
  )
  .catch((e) => {
    console.log("Connection Error");
    console.log("----------- -------------- -----------");
    console.log(e);
  });
