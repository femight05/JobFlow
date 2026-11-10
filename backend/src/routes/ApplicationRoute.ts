import express from "express";
import {
  createApplication,
  getApplications,
} from "../controllers/ApplicationController.ts";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);

export default router;
