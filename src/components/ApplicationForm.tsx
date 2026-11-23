import type { JobType, NewJobApplication, Status } from "../types/application";

interface ApplicationFormProps {
  formData: NewJobApplication;
  onFieldChange: <K extends keyof NewJobApplication>(
    field: K,
    value: NewJobApplication[K],
  ) => void;
}

const ApplicationForm = ({
  formData,
  onFieldChange,
}: ApplicationFormProps) => {

  const jobTypeOptions: JobType[] = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
  ];
  const statusOptions: Status[] = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm shadow-slate-100 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";
  const labelClassName = "text-sm font-semibold text-slate-700";

  return (
    <div className="space-y-7">
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="company">
            Company name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="e.g. Acme Inc."
            value={formData.company}
            onChange={(event) => onFieldChange("company", event.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="position">
            Job title
          </label>
          <input
            type="text"
            id="position"
            name="position"
            autoComplete="organization-title"
            placeholder="e.g. Product Designer"
            value={formData.position}
            onChange={(event) => onFieldChange("position", event.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            autoComplete="address-level2"
            placeholder="e.g. New York, NY or Remote"
            value={formData.location}
            onChange={(event) => onFieldChange("location", event.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="jobType">
            Employment type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={(e) => {
              const selectedJobType = e.target.value as JobType;
              onFieldChange("jobType", selectedJobType);
            }}
            required
            className={inputClassName}
          >
            <option value="" disabled>
              Select employment type
            </option>
            {jobTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName} htmlFor="status">
            Application status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => {
              const selectedStatus = e.target.value as Status;
              onFieldChange("status", selectedStatus);
            }}
            required
            className={inputClassName}
          >
            <option value="" disabled>
              Select current status
            </option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName} htmlFor="jobUrl">
            Job posting URL
          </label>
          <input
            type="url"
            id="jobUrl"
            name="jobUrl"
            placeholder="https://company.com/careers/role"
            value={formData.jobUrl}
            onChange={(event) => onFieldChange("jobUrl", event.target.value)}
            required
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label className={labelClassName} htmlFor="note">
          Notes about this job
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          placeholder="Add notes about the role, company, or application process"
          value={formData.note || ""}
          onChange={(event) => onFieldChange("note", event.target.value)}
          className={inputClassName}
        />
      </div>

      <p className="border-t border-slate-100 pt-5 text-xs leading-5 text-slate-400">
        Add the details you have now. You can update the application as things
        progress.
      </p>
    </div>
  );
};

export default ApplicationForm;
