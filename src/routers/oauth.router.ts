import express from "express";
import { github } from "../controller";

const router = express.Router();

router.post("/github", github);

// router.post("/google", google);

// router.post("/facebook", facebook);

// router.post("/twitter", twitter);

export default router;
