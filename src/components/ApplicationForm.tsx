import { useState } from "react";
import type { JobApplication } from "../types/application";
import type { JobType, Status } from "../types/application";

const ApplicationForm = () => {
  const [formData, setFormData] = useState<Partial<JobApplication>>({});

  const JobTypeOptions: JobType[] = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
  ];
  const StatusOptions: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

  return (
    <form>
      <label htmlFor="company">Company:</label>
      <input
        type="text"
        id="company"
        value={formData.company || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            company: e.target.value,
          })
        }
        name="company"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
      />
      <label htmlFor="position">Position:</label>
      <input
        type="text"
        id="position"
        value={formData.position || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            position: e.target.value,
          })
        }
        name="position"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
      />
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        value={formData.location || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            location: e.target.value,
          })
        }
        name="location"
      />
      <label htmlFor="jobType">Job Type:</label>
      <select
        id="jobType"
        name="jobType"
        value={formData.jobType || ""}
        onChange={(e) => {
          const selectedJobType = e.target.value as JobType;

          setFormData((prev) => ({
            ...prev,
            jobType: selectedJobType,
          }));
        }}
      >
        <option value="">Select a Type</option>
        {JobTypeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={formData.status || ""}
        onChange={(e) => {
          const selectedStatus = e.target.value as Status;

          setFormData((prev) => ({
            ...prev,
            status: selectedStatus,
          }));
        }}
        name="status"
      >
        <option value="">Select a Status</option>
        {StatusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <label htmlFor="location">Job URL:</label>
      <input
        type="text"
        id="location"
        value={formData.jobUrl || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            jobUrl: e.target.value,
          })
        }
        name="jobUrl"
      />
    </form>
  );
};

export default ApplicationForm;
