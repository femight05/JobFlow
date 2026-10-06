import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { JobApplication } from "../types/application";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";

type ApplicationProps = {
  applicationData: JobApplication;
};

const ApplicationCard = ({ applicationData }: ApplicationProps) => {
  const appliedDate = new Date(`${applicationData.appliedDate}T00:00:00`);
  const formattedDate = Number.isNaN(appliedDate.getTime())
    ? applicationData.appliedDate
    : new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(appliedDate);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50 transition duration-200 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-slate-200/70 sm:p-6">
      <Link
        to={`/applications/${applicationData.id}`}
        aria-label={`View application details for ${applicationData.position} at ${applicationData.company}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300"
      />
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-indigo-50 text-lg font-bold text-violet-700">
              {applicationData.company.trim().charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-bold text-slate-900">
                {applicationData.company}
              </h3>
              <p className="mt-0.5 truncate text-sm text-slate-500">
                {applicationData.position}
              </p>
            </div>
          </div>
          <StatusBadge status={applicationData.status} />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" size={14} className="text-slate-400" />
            {applicationData.location}
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">
            {applicationData.jobType}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays
              aria-hidden="true"
              size={14}
              className="text-slate-400"
            />
            Applied {formattedDate}
          </p>
        </div>
      </div>
      <div className="relative z-20 mt-3 flex justify-end">
        <a
          href={applicationData.jobUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          View posting
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  );
};

export default ApplicationCard;
