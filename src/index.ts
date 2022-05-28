import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";

import { AuthRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(cors(config.corsOptions));

app.listen(config.PORT, async () => {
  try {
    console.log("Running on port 5000...");
    await mongoose.connect(config.MONGO_URI!);
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
});

app.use("/auth", AuthRouter);
