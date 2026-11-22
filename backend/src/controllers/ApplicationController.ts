import type { Request, Response } from "express";
import Application from "../models/applicationModel.ts";
// import { createApplication as createApplicationService } from "../services/applicationService.ts";

type ApplicationRequest = Request & {
  user?: { id: string };
};

const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ createdBy: req.user?.id });
    if (!applications) {
      return res.status(404).send("You are unauthenticated");
    }
    res.status(200).json(applications);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

const createApplication = async (req: ApplicationRequest, res: Response) => {
  try {
    req.body.createdBy = req.user?.id;
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

const updateApplication = async (req: Request, res: Response) => {
  try {
    const { id: applicationId } = req.params;
    const application = await Application.findOneAndUpdate(
      { _id: applicationId, createdBy: req.user?.id },
      req.body,
      {
        returnDocument: "after",
        runValidator: true,
      },
    );
    if (!application) {
      return res
        .status(404)
        .json({
          error: "Not Found",
          message: `Application with the ID: ${applicationId} is not Found.`,
        });
    }
    res.json(application);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id: applicationId } = req.params;
    const application = await Application.findOneAndDelete({
      _id: applicationId,
      createdBy: req.user?.id,
    });
    if (!application) {
      return res.status(404).json({
        error: "Not Found",
        message: `Application with the ID: ${applicationId} is not Found.`,
      });
    }
    res.json(application);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

export {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
