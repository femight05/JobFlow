import { application } from "./application";
import type { JobApplication } from "../types/application";

const STORAGE_KEY = "jobflow-applications";

const isJobApplication = (value: unknown): value is JobApplication => {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.company === "string" &&
    typeof item.position === "string" &&
    typeof item.location === "string" &&
    typeof item.jobType === "string" &&
    typeof item.status === "string" &&
    typeof item.appliedDate === "string" &&
    typeof item.jobUrl === "string" &&
    (item.description === undefined || typeof item.description === "string") &&
    (item.note === undefined || typeof item.note === "string")
  );
};

export const getApplications = (): JobApplication[] => {
  const storedApplications = localStorage.getItem(STORAGE_KEY);
  if (storedApplications === null) return application;

  const parsed: unknown = JSON.parse(storedApplications);
  if (!Array.isArray(parsed) || !parsed.every(isJobApplication)) {
    throw new Error("Saved application data is invalid.");
  }

  return parsed;
};

export const saveApplications = (applications: JobApplication[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
};
