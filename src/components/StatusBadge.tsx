import type { Status } from "../types/application";

type StatusProps = {
  status: Status;
};

const statusStyles: Record<Status, string> = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/10",
  Interview: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Offer: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/10",
  Withdrawn: "bg-slate-100 text-slate-600 ring-slate-500/10",
};

const StatusBadge = ({ status }: StatusProps) => {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
