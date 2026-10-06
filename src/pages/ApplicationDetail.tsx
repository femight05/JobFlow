import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { application } from "../data/application";
import { getApplications, saveApplications } from "../data/applicationStorage";
import type { JobApplication, JobType, Status } from "../types/application";
import StatusBadge from "../components/StatusBadge";

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applicationId = Number(id);
  const [storedData, setStoredData] = useState(() => {
    try {
      return { applications: getApplications(), error: "" };
    } catch (loadError) {
      return {
        applications: application,
        error:
          loadError instanceof Error
            ? loadError.message
            : "Unable to load saved applications.",
      };
    }
  });
  const { applications, error } = storedData;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<JobApplication | null>(null);

  const app = applications.find((item) => item.id === applicationId);

  const updateDraft = <K extends keyof JobApplication>(
    field: K,
    value: JobApplication[K],
  ) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft) return;

    const updatedApplications = applications.map((item) =>
      item.id === draft.id ? draft : item,
    );

    try {
      saveApplications(updatedApplications);
      setStoredData({ applications: updatedApplications, error: "" });
      setIsEditing(false);
    } catch (saveError) {
      setStoredData((current) => ({
        ...current,
        error:
          saveError instanceof Error
            ? saveError.message
            : "Unable to save application changes.",
      }));
    }
  };

  const handleDelete = () => {
    if (!app || !window.confirm(`Delete the application for ${app.company}?`)) {
      return;
    }

    try {
      saveApplications(applications.filter((item) => item.id !== app.id));
      navigate("/");
    } catch (deleteError) {
      setStoredData((current) => ({
        ...current,
        error:
          deleteError instanceof Error
            ? deleteError.message
            : "Unable to delete this application.",
      }));
    }
  };

  if (!app) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Application not found</h1>
          <p className="mt-2 text-slate-500">
            {error ||
              "This application may have been removed or the link is invalid."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex font-semibold text-violet-600 hover:text-violet-800"
          >
            Back to applications
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-6 inline-flex font-semibold text-violet-600 hover:text-violet-800"
        >
          Back to applications
        </Link>
        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}
          {isEditing && draft ? (
            <form onSubmit={handleSave} className="space-y-5">
              <h1 className="text-2xl font-bold">Edit application</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Company
                  <input
                    required
                    value={draft.company}
                    onChange={(event) => updateDraft("company", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Position
                  <input
                    required
                    value={draft.position}
                    onChange={(event) => updateDraft("position", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Location
                  <input
                    required
                    value={draft.location}
                    onChange={(event) => updateDraft("location", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Job type
                  <select
                    value={draft.jobType}
                    onChange={(event) =>
                      updateDraft("jobType", event.target.value as JobType)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  >
                    {["Full-time", "Part-time", "Internship", "Contract"].map(
                      (jobType) => (
                        <option key={jobType}>{jobType}</option>
                      ),
                    )}
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Status
                  <select
                    value={draft.status}
                    onChange={(event) =>
                      updateDraft("status", event.target.value as Status)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  >
                    {["Applied", "Interview", "Offer", "Rejected", "Withdrawn"].map(
                      (status) => (
                        <option key={status}>{status}</option>
                      ),
                    )}
                  </select>
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Applied date
                  <input
                    type="date"
                    required
                    value={draft.appliedDate}
                    onChange={(event) =>
                      updateDraft("appliedDate", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                  Job posting URL
                  <input
                    type="url"
                    required
                    value={draft.jobUrl}
                    onChange={(event) => updateDraft("jobUrl", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                  Job description
                  <textarea
                    value={draft.description || ""}
                    onChange={(event) =>
                      updateDraft("description", event.target.value)
                    }
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                  Note
                  <textarea
                    value={draft.note || ""}
                    onChange={(event) => updateDraft("note", event.target.value)}
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(null);
                    setIsEditing(false);
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-violet-600">
                    {app.company}
                  </p>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight">
                    {app.position}
                  </h1>
                </div>
                <StatusBadge status={app.status} />
              </div>

              <dl className="mt-8 grid gap-5 border-y border-slate-100 py-6 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-slate-500">Job type</dt>
                  <dd className="mt-1 font-semibold">{app.jobType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Location</dt>
                  <dd className="mt-1 font-semibold">{app.location}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Applied</dt>
                  <dd className="mt-1 font-semibold">{app.appliedDate}</dd>
                </div>
              </dl>

              <section className="mt-6">
                <h2 className="text-lg font-bold">Job description</h2>
                <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
                  {app.description || "No job description added."}
                </p>
              </section>

              <section className="mt-6">
                <h2 className="text-lg font-bold">Note</h2>
                <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
                  {app.note || "No note added."}
                </p>
              </section>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <a
                  href={app.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
                >
                  View job posting
                </a>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDraft({ ...app });
                      setIsEditing(true);
                    }}
                    className="rounded-xl border border-violet-200 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </article>
      </div>
    </main>
  );
};

export default ApplicationDetail;
