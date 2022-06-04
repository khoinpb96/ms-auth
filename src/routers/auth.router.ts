import express from "express";
import { register, login } from "../controller";
import { checkInput } from "../middleware";

const router = express.Router();

router.post("/register", checkInput, register);

router.post("/login", checkInput, login);

export default router;
