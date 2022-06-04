import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";

import { AuthRouter, HealthCheck, OAuthRouter, UserRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(cors(config.corsOptions));

app.listen(config.PORT, async () => {
  try {
    console.log(`Running on port ${config.PORT}...`);
    await mongoose.connect(config.MONGO_URI!);
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
});

app.get("/health", HealthCheck);

app.use("/auth", AuthRouter);
app.use("/oauth", OAuthRouter);
app.use("/users", UserRouter);
