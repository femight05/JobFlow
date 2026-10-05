import { ArrowLeft, BriefcaseBusiness, Plus } from "lucide-react";
import ApplicationForm from "../components/ApplicationForm";

const AddApplication = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f3ff_0%,#eef2ff_32%,#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
            <BriefcaseBusiness size={14} />
            New application
          </div>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-white/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-sm">
          <div className="border-b border-slate-100 bg-linear-to-br from-white via-white to-violet-50/70 px-6 py-7 sm:px-9 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Add opportunity
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Track a new job
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Save the details in one place and stay on top of every step in
                  your job search.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-violet-100 bg-white px-3.5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-violet-100">
                  <Plus size={14} />
                </span>
                Application details
              </div>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-9 sm:py-9">
            <ApplicationForm />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <p className="text-xs text-slate-400">
              Your application details are kept together for easy tracking.
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                <Plus size={16} />
                Add Application
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddApplication;
