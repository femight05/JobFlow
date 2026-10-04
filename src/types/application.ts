type JobType = "Full" | "Part" | "Internship" | "Contract";

type Status = "Applied" | "Interview" | "Offer" | "Rejected" | "Withdrawn";

export interface JobApplication {
  id: number;
  comapny: string;
  position: string;
  location: string;
  jobType: JobType;
  status: Status;
  appliedDate: string;
  jobURL: string;
}
