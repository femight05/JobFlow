import type { JobApplication, JobType, Status } from "../types/application";

const isJobType = (value: unknown): value is JobType =>
  value === "Full-time" ||
  value === "Part-time" ||
  value === "Internship" ||
  value === "Contract";

const isStatus = (value: unknown): value is Status =>
  value === "Applied" ||
  value === "Interview" ||
  value === "Offer" ||
  value === "Rejected" ||
  value === "Withdrawn";

export const mapBackendApplication = (value: unknown): JobApplication => {
  if (typeof value !== "object" || value === null) {
    throw new Error("The server returned invalid application data.");
  }

  const record = value as Record<string, unknown>;
  const status = record.status === "Offer Received" ? "Offer" : record.status;

  if (
    typeof record._id !== "string" ||
    typeof record.company !== "string" ||
    typeof record.position !== "string" ||
    typeof record.location !== "string" ||
    !isJobType(record.jobType) ||
    !isStatus(status) ||
    typeof record.appliedDate !== "string" ||
    typeof record.jobUrl !== "string" ||
    (record.description !== undefined &&
      typeof record.description !== "string") ||
    (record.note !== undefined && typeof record.note !== "string")
  ) {
    throw new Error("The server returned invalid application data.");
  }

  const appliedDate = new Date(record.appliedDate);
  if (Number.isNaN(appliedDate.getTime())) {
    throw new Error("The server returned an invalid application date.");
  }

  return {
    id: record._id,
    company: record.company,
    position: record.position,
    location: record.location,
    jobType: record.jobType,
    status,
    appliedDate: appliedDate.toISOString().slice(0, 10),
    jobUrl: record.jobUrl,
    description: record.description,
    note: record.note,
  };
};

export const toBackendApplicationStatus = (status: Status) =>
  status === "Offer" ? "Offer Received" : status;
