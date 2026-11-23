import express from "express";
import {
  createApplication,
  getApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} from "../controllers/ApplicationController.ts";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router
  .route("/:id")
  .get(getApplication)
  .patch(updateApplication)
  .delete(deleteApplication);

export default router;
