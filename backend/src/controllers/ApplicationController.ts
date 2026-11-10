import type { Request, Response } from "express";
import Application from "../models/applicationModel.ts";

const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

const createApplication = async (req: Request, res: Response) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

const updateApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (!application) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Application not found." });
    }
    res.json(application);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

export { getApplications, createApplication, updateApplication };
