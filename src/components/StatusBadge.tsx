import type { Status } from "../types/application";

type StatusProps = {
  status: Status;
};

const StatuBadge = ({ status }: StatusProps) => {
  return <div className="border px-4 py-2 rounded-2xl">{status}</div>;
};

export default StatuBadge;
