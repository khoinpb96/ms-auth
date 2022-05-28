import express from "express";
import { AuthController } from "../controller";
import { checkInput } from "../middleware";

const router = express.Router();

router.post("/register", checkInput, AuthController.register);

router.post("/login", checkInput, AuthController.login);

export default router;
