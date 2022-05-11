import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { checkInput } from "./middleware";
import config from "./config";
import { User } from "./model/User";

const app = express();
app.use(bodyParser.json());

app.listen(config.PORT, async () => {
  try {
    console.log("Running on port 5000...");
    await mongoose.connect(config.MONGO_URI!);
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", checkInput, async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(402).send("Username already existed");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      authType: "local",
    });

    res.status(201).send({
      code: 201,
      message: `Create user ${newUser.username} successfully`,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/login", checkInput, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(402).send("Username is not existed");

    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) return res.status(402).send("Wrong password");

    const token = jwt.sign({ username }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      code: 200,
      message: `Login successfully`,
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
