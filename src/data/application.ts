import type { JobApplication } from "../types/application";

export const application: JobApplication[] = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    location: "Mountain View, CA",
    jobType: "Full-time",
    status: "Applied",
    appliedDate: "2023-01-01",
    jobURL: "https://www.google.com/jobs/view/software-engineer",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Software Engineer",
    location: "Remote",
    jobType: "Internship",
    status: "Applied",
    appliedDate: "2023-01-01",
    jobURL: "https://www.microsoft.com/jobs/view/software-engineer",
  },
  {
    id: 3,
    company: "Google",
    position: "Frontend Engineer",
    location: "Remote",
    jobType: "Full-time",
    status: "Interview",
    appliedDate: "2023-01-01",
    jobURL: "https://www.google.com/jobs/view/frontend-engineer",
  },
];
