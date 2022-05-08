import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import { User } from "./model/User";
import bcrypt from "bcryptjs";

const app = express();
app.use(bodyParser.json());

app.listen(5000, async () => {
  console.log("Running on port 5000...");
  await mongoose.connect(config.MONGO_URI!);
  console.log("Mongoose connected");
});

app.get("/register", async (req, res) => {
  const { username, password } = req.body;
  const validInput = username.trim().length > 6 && password.trim().length > 6;
  if (!validInput) return res.status(400).send("Your input is invalid");

  try {
    const existedUser = await User.findOne({ username });
    if (existedUser) return res.status(402).send("Username already existed");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      authType: "local",
    });

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
