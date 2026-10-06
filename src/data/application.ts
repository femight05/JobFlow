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
    jobUrl: "https://www.google.com/jobs/view/software-engineer",
    description:
      "We are looking for a talented software engineer to join our team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to the overall success of our products.",
    note: "This is a great opportunity to work with cutting-edge technologies and be part of a dynamic team. The company offers competitive compensation, benefits, and opportunities for growth.",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Software Engineer",
    location: "Remote",
    jobType: "Internship",
    status: "Applied",
    appliedDate: "2023-01-01",
    jobUrl: "https://www.microsoft.com/jobs/view/software-engineer",
    description:
      "We are looking for a talented software engineer to join our team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to the overall success of our products.",
    note: "This is a great opportunity to work with cutting-edge technologies and be part of a dynamic team. The company offers competitive compensation, benefits, and opportunities for growth.",
  },
  {
    id: 3,
    company: "Google",
    position: "Frontend Engineer",
    location: "Remote",
    jobType: "Full-time",
    status: "Interview",
    appliedDate: "2023-01-01",
    jobUrl: "https://www.google.com/jobs/view/frontend-engineer",
    description:
      "We are looking for a talented frontend engineer to join our team.",
    note: "Interview scheduled for next week. Need to prepare for technical questions and coding challenges.",
  },
];
