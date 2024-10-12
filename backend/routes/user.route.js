import express from "express";
import { employees, signout, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/signout", signout);
router.get("/employees", employees);

export default router;
