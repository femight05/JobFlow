import express from "express";
import {
  createApplication,
  getApplications,
  updateApplication,
} from "../controllers/ApplicationController.ts";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router.route("/:id").put(updateApplication);

export default router;
