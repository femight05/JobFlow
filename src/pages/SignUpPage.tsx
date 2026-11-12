import { BriefcaseBusiness, Check } from "lucide-react";

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-4 py-8 text-slate-900 sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(30,41,59,0.12)] md:grid-cols-2">
        <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-slate-800 p-7 text-white sm:p-10 md:min-h-155">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border-36 border-white/10" />
          <div className="relative flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
              <BriefcaseBusiness size={21} />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Job Flow
            </span>
          </div>
          <div className="relative mt-12 max-w-sm">
            <p className="text-sm font-medium text-sky-200">
              A little more focus, a lot less juggling.
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Make room for your next opportunity.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-200">
              Keep your applications, notes, and next steps together while you
              find the right fit.
            </p>
          </div>
          <div className="relative mt-10 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-200">
              One step at a time
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="flex size-7 items-center justify-center rounded-full bg-emerald-300 text-emerald-950">
                <Check size={15} />
              </span>
              <span>Your search, all in one place</span>
            </div>
          </div>
        </aside>

        <div className="flex items-center px-6 py-9 sm:px-10 md:px-12">
          <div className="mx-auto w-full max-w-sm">
            <p className="text-sm font-semibold text-sky-700">Get started</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Set up your space and make your job search feel more manageable.
            </p>

            <form action="" method="post" className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-200/70 transition hover:-translate-y-0.5 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                Create account
              </button>
            </form>
            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              You can update your details anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
