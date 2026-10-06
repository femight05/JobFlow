import { Link, useParams } from "react-router-dom";
import { application } from "../data/application";
import StatusBadge from "../components/StatusBadge";

const ApplicationDetail = () => {
  const { id } = useParams();
  const app = application.find((item) => item.id === Number(id));

  if (!app) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Application not found</h1>
          <p className="mt-2 text-slate-500">
            This application may have been removed or the link is invalid.
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

          <a
            href={app.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200"
          >
            View job posting
          </a>
        </article>
      </div>
    </main>
  );
};

export default ApplicationDetail;
