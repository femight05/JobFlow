import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CircleCheck,
  Search,
  Send,
  Video,
} from "lucide-react";
import ApplicationCard from "../components/ApplicationCard";
import type { JobApplication, JobType, Status } from "../types/application";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/authContextStore";

const statuses: Array<Status | "All statuses"> = [
  "All statuses",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

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

const mapBackendApplication = (value: unknown): JobApplication => {
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

const Application = () => {
  const { token } = useAuth();
  const [loadState, setLoadState] = useState<{
    token: string;
    applications: JobApplication[];
    error: string;
  } | null>(null);
  const isLoading = Boolean(token) && loadState?.token !== token;
  const applications =
    token && loadState?.token === token ? loadState.applications : [];
  const error = token
    ? loadState?.token === token
      ? loadState.error
      : ""
    : "Please sign in to view your applications.";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All statuses">(
    "All statuses",
  );

  useEffect(() => {
    if (!token) return;

    let isActive = true;
    const loadApplications = async () => {
      try {
        const data: unknown = await api("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!Array.isArray(data)) {
          throw new Error("The server returned invalid application data.");
        }

        const loadedApplications = data.map(mapBackendApplication);
        if (isActive) {
          setLoadState({ token, applications: loadedApplications, error: "" });
        }
      } catch (loadError) {
        if (isActive) {
          setLoadState({
            token,
            applications: [],
            error:
              loadError instanceof Error
                ? loadError.message
                : "Unable to load applications.",
          });
        }
      }
    };

    void loadApplications();
    return () => {
      isActive = false;
    };
  }, [token]);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((item) => {
      const matchesQuery =
        !query ||
        [item.company, item.position, item.location].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesStatus =
        selectedStatus === "All statuses" || item.status === selectedStatus;

      return matchesQuery && matchesStatus;
    });
  }, [applications, searchQuery, selectedStatus]);

  const metrics = [
    {
      label: "Total applications",
      value: applications.length,
      note: "Across all roles",
      icon: BriefcaseBusiness,
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "In progress",
      value: applications.filter(
        (item) => item.status === "Applied" || item.status === "Interview",
      ).length,
      note: "Keep the momentum",
      icon: Send,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Interviews",
      value: applications.filter((item) => item.status === "Interview").length,
      note: "Opportunities in motion",
      icon: Video,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Offers",
      value: applications.filter((item) => item.status === "Offer").length,
      note: "Good things ahead",
      icon: CircleCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {error && (
          <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Your career dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Applications
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Keep every opportunity moving forward.
            </p>
          </div>
          <Link
            to="/add-application"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-200 sm:self-center"
          >
            <span className="text-lg leading-none">+</span>
            Add Application
          </Link>
        </header>

        <section
          aria-label="Application overview"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {metrics.map(({ label, value, note, icon: Icon, color }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight">
                    {value}
                  </p>
                </div>
                <span className={`rounded-xl p-3 ${color}`}>
                  <Icon aria-hidden="true" size={20} />
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-400">{note}</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="application-list-heading">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="application-list-heading"
                className="text-xl font-bold tracking-tight"
              >
                All applications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredApplications.length}{" "}
                {filteredApplications.length === 1 ? "role" : "roles"} to keep
                track of
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <label className="relative block sm:w-72">
                <span className="sr-only">Search applications</span>
                <Search
                  aria-hidden="true"
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  name="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search company, role, location..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                />
              </label>
              <label className="sr-only" htmlFor="status">
                Filter by status
              </label>
              <select
                name="status"
                id="status"
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(
                    event.target.value as Status | "All statuses",
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <p className="rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center text-sm text-slate-500">
              Loading applications...
            </p>
          ) : filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredApplications.map((item) => (
                <ApplicationCard key={item.id} applicationData={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Search aria-hidden="true" size={21} />
              </span>
              <h3 className="font-semibold text-slate-800">
                No applications found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a different search or status filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Application;
