export type JobType = "Full-time" | "Part-time" | "Internship" | "Contract";

export type Status =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  location: string;
  jobType: JobType;
  status: Status;
  appliedDate: string;
  jobUrl: string;
}
